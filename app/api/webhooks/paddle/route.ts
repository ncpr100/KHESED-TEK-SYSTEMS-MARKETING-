/**
 * Paddle Webhook Handler
 * Processes payment confirmations and sends download links
 * 
 * Webhook Events Handled:
 * - transaction.completed: Payment successful, send download link
 * - transaction.payment_failed: Payment failed, log for support
 * 
 * Webhook URL: https://your-domain.vercel.app/api/webhooks/paddle
 */

import { NextRequest } from 'next/server';
import { 
  findProductRequestByTransactionId,
  updateProductRequest,
  generateDownloadUrl 
} from '@/lib/products/supabase-client';
import { verifyWebhookSignature } from '@/lib/payment/paddle-client';
import { getProductInfo } from '@/lib/products/catalog';
import { getDownloadLinkEmailTemplate } from '@/lib/email/product-templates';
import { Language } from '@/types/products';
import nodemailer from 'nodemailer';

const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET || '';

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  console.log('=== Paddle Webhook Received ===');
  
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('paddle-signature') || '';
    
    // Verify webhook signature (security measure)
    if (PADDLE_WEBHOOK_SECRET && !verifyWebhookSignature(body, signature, PADDLE_WEBHOOK_SECRET)) {
      console.error('Webhook signature verification failed');
      return Response.json(
        { ok: false, error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    // Parse webhook event
    const event = JSON.parse(body);
    console.log('Event type:', event.event_type);
    console.log('Transaction ID:', event.data?.id);
    
    // Handle different event types
    switch (event.event_type) {
      case 'transaction.completed':
        await handleTransactionCompleted(event);
        break;
        
      case 'transaction.payment_failed':
        await handlePaymentFailed(event);
        break;
        
      default:
        console.log('Unhandled event type:', event.event_type);
    }
    
    // Always return 200 to acknowledge receipt
    return Response.json({ ok: true, received: true });
    
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    // Still return 200 to prevent Paddle from retrying indefinitely
    return Response.json({ ok: true, error: error.message });
  }
}

/**
 * Handle successful payment
 */
async function handleTransactionCompleted(event: any) {
  console.log('Processing transaction.completed');
  
  const transactionId = event.data.id;
  const customData = event.data.custom_data || {};
  const productRequestId = customData.productRequestId;
  
  if (!productRequestId) {
    console.error('No productRequestId in custom data');
    return;
  }
  
  // Find the product request
  const productRequest = await findProductRequestByTransactionId(transactionId);
  if (!productRequest) {
    console.error('Product request not found for transaction:', transactionId);
    return;
  }
  
  console.log('Found product request:', productRequest.id);
  
  // Get product info
  const productInfo = getProductInfo(productRequest.productType);
  
  // Generate download link (only for e-books)
  let downloadLink: string | undefined;
  if (!productInfo.isPhysical && productInfo.downloadPath) {
    try {
      // Generate signed URL valid for 24 hours
      downloadLink = await generateDownloadUrl(productInfo.downloadPath, 86400);
      console.log('Download link generated');
    } catch (error) {
      console.error('Error generating download link:', error);
      // Continue anyway, we'll send support email
    }
  }
  
  // Update product request status
  await updateProductRequest(productRequest.id!, {
    status: downloadLink ? 'delivered' : 'paid',
    paddleTransactionId: transactionId,
    downloadLink,
  });
  
  console.log('Product request updated to:', downloadLink ? 'delivered' : 'paid');
  
  // Send download link email
  if (downloadLink) {
    const language = productRequest.language || 'es';
    const productTitle = language === 'es' ? productInfo.titleES : productInfo.titleEN;
    
    const emailTemplate = getDownloadLinkEmailTemplate({
      customerName: productRequest.customerName,
      productType: productRequest.productType,
      language: language as Language,
      downloadLink,
      productTitle,
      expiresInHours: 24,
    });
    
    await transporter.sendMail({
      from: `"KHESED-TEK Systems" <${process.env.GMAIL_USER}>`,
      to: productRequest.customerEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });
    
    console.log('Download link email sent to:', productRequest.customerEmail);
  } else {
    // No download link - send manual follow-up notification to support
    await transporter.sendMail({
      from: `"KHESED-TEK Systems" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Manual Fulfillment Required - ${productRequest.customerName}`,
      text: `
Payment received but download link could not be generated automatically.

Customer: ${productRequest.customerName}
Email: ${productRequest.customerEmail}
Product: ${productRequest.productType}
Transaction: ${transactionId}

Please send download link manually.
      `,
    });
    
    console.log('Manual fulfillment notification sent to support');
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(event: any) {
  console.log('Processing transaction.payment_failed');
  
  const transactionId = event.data.id;
  const customData = event.data.custom_data || {};
  const productRequestId = customData.productRequestId;
  
  if (!productRequestId) {
    console.error('No productRequestId in custom data');
    return;
  }
  
  // Find the product request
  const productRequest = await findProductRequestByTransactionId(transactionId);
  if (!productRequest) {
    console.error('Product request not found for transaction:', transactionId);
    return;
  }
  
  // Update status to failed
  await updateProductRequest(productRequest.id!, {
    status: 'failed',
    paddleTransactionId: transactionId,
  });
  
  console.log('Product request marked as failed:', productRequest.id);
  
  // Notify support team
  await transporter.sendMail({
    from: `"KHESED-TEK Systems" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `Payment Failed - ${productRequest.customerName}`,
    text: `
Payment failed for customer.

Customer: ${productRequest.customerName}
Email: ${productRequest.customerEmail}
Product: ${productRequest.productType}
Transaction: ${transactionId}

Customer may need support.
    `,
  });
}
