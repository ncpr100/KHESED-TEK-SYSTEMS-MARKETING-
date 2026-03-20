/**
 * Product Request API Route
 * Handles product purchase requests (E-books, Journal App)
 * 
 * Flow:
 * 1. Validate form data
 * 2. Create record in Supabase
 * 3. Generate Paddle payment link (for e-books)
 * 4. Send email with payment link or interest confirmation
 * 5. Return success response
 */

import { NextRequest } from 'next/server';
import { ProductFormData, Language } from '@/types/products';
import { 
  createProductRequest, 
  updateProductRequest,
  isSupabaseConfigured 
} from '@/lib/products/supabase-client';
import { 
  createCheckoutLink,
  isPaddleConfigured 
} from '@/lib/payment/paddle-client';
import { 
  getPaddleProductId,
  getProductInfo,
  getProductTitle,
  getProductDescription,
  isProductAvailable,
  getPriceWithFee 
} from '@/lib/products/catalog';
import { 
  getPaymentLinkEmailTemplate,
  getJournalAppInterestEmailTemplate 
} from '@/lib/email/product-templates';
import nodemailer from 'nodemailer';

// Gmail SMTP configuration (reusing existing email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  console.log('=== Product Request API ===');
  
  try {
    // Parse form data
    const formData = await request.json();
    
    const payload: ProductFormData = {
      productType: formData.productType,
      language: formData.language || 'es',
      customerName: String(formData.customerName || '').trim(),
      customerEmail: String(formData.customerEmail || '').trim(),
      country: formData.country,
    };
    
    // Extract processing fees flag
    const coverProcessingFees = Boolean(formData.coverProcessingFees);
    
    // Validation
    if (!payload.productType || !payload.customerName || !payload.customerEmail) {
      return Response.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.customerEmail)) {
      return Response.json(
        { ok: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Check if product is available
    if (!isProductAvailable(payload.productType)) {
      // Product not available - handle Journal App interest
      console.log('Product not available, handling as interest request');
      
      // Save to database if configured
      let requestId: string | undefined;
      if (isSupabaseConfigured()) {
        const productRequest = await createProductRequest({
          productType: payload.productType,
          language: payload.language,
          customerName: payload.customerName,
          customerEmail: payload.customerEmail,
          country: payload.country,
          status: 'pending',
        });
        requestId = productRequest.id;
      }
      
      // Send interest email
      const emailTemplate = getJournalAppInterestEmailTemplate(
        payload.customerName,
        payload.language
      );
      
      await transporter.sendMail({
        from: `"KHESED-TEK Systems" <${process.env.GMAIL_USER}>`,
        to: payload.customerEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });
      
      return Response.json({
        ok: true,
        message: 'Interest registered',
        requestId,
        status: 'interest_recorded',
      });
    }
    
    // Check Supabase configuration
    if (!isSupabaseConfigured()) {
      console.error('Supabase not configured');
      return Response.json(
        { ok: false, error: 'Database not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
    // Check Paddle configuration
    if (!isPaddleConfigured()) {
      console.error('Paddle not configured');
      return Response.json(
        { ok: false, error: 'Payment system not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
    // Create product request in database
    const productRequest = await createProductRequest({
      productType: payload.productType,
      language: payload.language,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      country: payload.country,
      status: 'pending',
    });
    
    console.log('Product request created:', productRequest.id);
    
    // Get Paddle product ID
    const paddleProductId = getPaddleProductId(payload.productType, payload.language);
    if (!paddleProductId) {
      console.error('Paddle product ID not configured for:', payload.productType, payload.language);
      return Response.json(
        { ok: false, error: 'Product configuration error. Please contact support.' },
        { status: 500 }
      );
    }
    
    // Calculate final price (base price + processing fees if user opted in)
    const pricing = getPriceWithFee(payload.productType);
    const finalPrice = coverProcessingFees ? pricing.total : pricing.basePrice;
    
    console.log(`Processing fees: ${coverProcessingFees ? 'Yes' : 'No'} | Final price: $${finalPrice.toFixed(2)}`);
    
    // Create Paddle checkout link
    const checkoutData = await createCheckoutLink(
      paddleProductId,
      payload.customerEmail,
      payload.customerName,
      {
        productRequestId: productRequest.id,
        productType: payload.productType,
        language: payload.language,
      },
      finalPrice // Pass calculated price
    );
    
    console.log('Paddle checkout created:', checkoutData.checkoutId);
    
    // Update product request with payment link
    await updateProductRequest(productRequest.id!, {
      paymentLink: checkoutData.checkoutUrl,
      paddleCheckoutId: checkoutData.checkoutId ?? undefined, // Convert null to undefined
      status: 'payment_sent',
    });
    
    // Get product info for email
    const productInfo = getProductInfo(payload.productType);
    const productTitle = getProductTitle(payload.productType, payload.language);
    const productDescription = getProductDescription(payload.productType, payload.language);
    
    // Send payment link email with pricing details
    const emailTemplate = getPaymentLinkEmailTemplate({
      customerName: payload.customerName,
      productType: payload.productType,
      language: payload.language,
      paymentLink: checkoutData.checkoutUrl,
      productTitle,
      productDescription,
      // Include processing fees info if user opted in
      ...(coverProcessingFees && {
        coverProcessingFees: true,
        basePrice: pricing.basePrice,
        processingFee: pricing.fee,
        totalPrice: pricing.total,
      }),
    });
    
    await transporter.sendMail({
      from: `"KHESED-TEK Systems" <${process.env.GMAIL_USER}>`,
      to: payload.customerEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });
    
    console.log('Payment link email sent to:', payload.customerEmail);
    
    return Response.json({
      ok: true,
      message: 'Payment link sent successfully',
      requestId: productRequest.id,
      checkoutId: checkoutData.checkoutId,
    });
    
  } catch (error: any) {
    console.error('Error processing product request:', error);
    return Response.json(
      { 
        ok: false, 
        error: 'Failed to process request. Please try again or contact support.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
