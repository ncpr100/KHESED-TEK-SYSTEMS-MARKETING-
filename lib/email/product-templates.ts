/**
 * Product Email Templates
 * Email templates for product donations (E-books, Journal App)
 * All products are supported through donations with 33% going to rehabilitation programs
 */

import { Language, ProductType } from '@/types/products';
import { getProductTitle, getProductDescription } from '@/lib/products/catalog';

/**
 * Donation link email (sent after form submission)
 */
export interface PaymentEmailData {
  customerName: string;
  productType: ProductType;
  language: Language;
  paymentLink: string;
  productTitle: string;
  productDescription: string;
  // Optional: Processing fees information
  coverProcessingFees?: boolean;
  basePrice?: number;
  processingFee?: number;
  totalPrice?: number;
}

export function getPaymentLinkEmailTemplate(data: PaymentEmailData): { subject: string; html: string; text: string } {
  const isSpanish = data.language === 'es';
  
  if (isSpanish) {
    return {
      subject: `Gracias por tu inter\u00e9s en "${data.productTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .mission-box { background: #fff3e0; border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u00a1Gracias por tu generosidad!</h1>
            </div>
            <div class="content">
              <p>Hola ${data.customerName},</p>
              
              <p>Gracias por tu inter\u00e9s en <strong>${data.productTitle}</strong>.</p>
              
              <p>${data.productDescription}</p>
              
              <div class="mission-box">
                <h3 style="margin-top: 0; color: #ff9800;">\ud83e\udd1d Tu donaci\u00f3n transforma vidas</h3>
                <p style="margin: 0; font-size: 14px;">
                  <strong>El 33% de todos los fondos recaudados a través de Khesed-Tek Systems</strong> se destina directamente a Fundación Misión Khesed para apoyar su trabajo en alianza con programas locales, iglesias y organizaciones en Colombia y Latinoamérica, ayudando a comunidades vulnerables con alimentos, ropa y apoyo integral.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 14px; font-weight: bold; color: #ff9800;">
                  Tu contribuci\u00f3n no solo te fortalece a ti; restaura vidas.
                </p>
              </div>
              
              <p>Para completar tu donaci\u00f3n y acceder al recurso, haz clic en el siguiente bot\u00f3n:</p>
              
              <div style="text-align: center;">
                <a href="${data.paymentLink}" class="button">Completar Donaci\u00f3n Segura</a>
              </div>
              
              <p><small>O copia y pega este enlace en tu navegador:<br>${data.paymentLink}</small></p>
              
              ${data.coverProcessingFees && data.basePrice && data.processingFee && data.totalPrice ? `
              <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Desglose de tu donaci\u00f3n:</strong></p>
                <p style="margin: 5px 0;">Aporte base: $${data.basePrice.toFixed(2)} USD</p>
                <p style="margin: 5px 0;">Costos de procesamiento: +$${data.processingFee.toFixed(2)} USD</p>
                <p style="margin: 5px 0; font-size: 18px;"><strong>Total: $${data.totalPrice.toFixed(2)} USD</strong></p>
                <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">
                  \u00a1Gracias por ayudarnos a cubrir los costos! Esto significa que el 100% de tu aporte base llega directamente al recurso y al apoyo de comunidades vulnerables.
                </p>
              </div>
              ` : `
              <p><strong>Aporte sugerido:</strong> ${data.basePrice ? `$${data.basePrice.toFixed(2)}` : '$9.99'} USD</p>
              `}
              
              <p>Una vez que completes tu donaci\u00f3n, recibir\u00e1s inmediatamente un correo con el enlace de descarga.</p>
              
              <p>Si tienes alguna pregunta, no dudes en responder a este correo.</p>
              
              <p>Bendiciones,<br>
              <strong>Equipo KHESED-TEK</strong></p>
            </div>
            <div class="footer">
              <p>KHESED-TEK Systems<br>
              Tecnolog\u00eda para el Reino<br>
              <a href="https://www.khesed-tek-systems.org">www.khesed-tek-systems.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hola ${data.customerName},

Gracias por tu inter\u00e9s en ${data.productTitle}.

${data.productDescription}

\ud83e\udd1d TU DONACI\u00d3N TRANSFORMA VIDAS

El 33% de todos los fondos recaudados a trav\u00e9s de Khesed-Tek Systems se destina directamente a Fundaci\u00f3n Misi\u00f3n Khesed para apoyar su trabajo en alianza con programas locales, iglesias y organizaciones en Colombia y Latinoam\u00e9rica, ayudando a comunidades vulnerables con alimentos, ropa y apoyo integral.

Tu contribuci\u00f3n no solo te fortalece a ti; restaura vidas.

---

Para completar tu donaci\u00f3n y acceder al recurso, visita el siguiente enlace:
${data.paymentLink}

${data.coverProcessingFees && data.basePrice && data.processingFee && data.totalPrice ? `
DESGLOSE DE TU DONACI\u00d3N:
- Aporte base: $${data.basePrice.toFixed(2)} USD
- Costos de procesamiento: +$${data.processingFee.toFixed(2)} USD
- TOTAL: $${data.totalPrice.toFixed(2)} USD

\u00a1Gracias por ayudarnos a cubrir los costos! Esto significa que el 100% de tu aporte base llega directamente al recurso y al apoyo de comunidades vulnerables.
` : `Aporte sugerido: ${data.basePrice ? `$${data.basePrice.toFixed(2)}` : '$9.99'} USD`}

Una vez que completes tu donaci\u00f3n, recibir\u00e1s inmediatamente un correo con el enlace de descarga.

Si tienes alguna pregunta, no dudes en responder a este correo.

Bendiciones,
Equipo KHESED-TEK

---
KHESED-TEK Systems
Tecnolog\u00eda para el Reino
https://www.khesed-tek-systems.org
      `,
    };
  } else {
    return {
      subject: `Thank you for your interest in "${data.productTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .mission-box { background: #fff3e0; border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Generosity!</h1>
            </div>
            <div class="content">
              <p>Hello ${data.customerName},</p>
              
              <p>Thank you for your interest in <strong>${data.productTitle}</strong>.</p>
              
              <p>${data.productDescription}</p>
              
              <div class="mission-box">
                <h3 style="margin-top: 0; color: #ff9800;">\ud83e\udd1d Your donation transforms lives</h3>
                <p style="margin: 0; font-size: 14px;">
                  <strong>33% of all funds raised through Khesed-Tek Systems</strong> goes directly to Fundación Misión Khesed to support their work in partnership with local programs, churches, and organizations in Colombia and Latin America, helping vulnerable communities with food, clothing, and comprehensive support.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 14px; font-weight: bold; color: #ff9800;">
                  Your contribution not only strengthens you; it restores lives.
                </p>
              </div>
              
              <p>To complete your donation and access the resource, click the button below:</p>
              
              <div style="text-align: center;">
                <a href="${data.paymentLink}" class="button">Complete Secure Donation</a>
              </div>
              
              <p><small>Or copy and paste this link into your browser:<br>${data.paymentLink}</small></p>
              
              ${data.coverProcessingFees && data.basePrice && data.processingFee && data.totalPrice ? `
              <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Your donation breakdown:</strong></p>
                <p style="margin: 5px 0;">Base contribution: $${data.basePrice.toFixed(2)} USD</p>
                <p style="margin: 5px 0;">Processing costs: +$${data.processingFee.toFixed(2)} USD</p>
                <p style="margin: 5px 0; font-size: 18px;"><strong>Total: $${data.totalPrice.toFixed(2)} USD</strong></p>
                <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">
                  Thank you for helping us cover the costs! This means that 100% of your base contribution goes directly to the resource and supporting vulnerable communities.
                </p>
              </div>
              ` : `
              <p><strong>Suggested contribution:</strong> ${data.basePrice ? `$${data.basePrice.toFixed(2)}` : '$9.99'} USD</p>
              `}
              
              <p>Once you complete your donation, you will immediately receive an email with the download link.</p>
              
              <p>If you have any questions, please don't hesitate to reply to this email.</p>
              
              <p>Blessings,<br>
              <strong>KHESED-TEK Team</strong></p>
            </div>
            <div class="footer">
              <p>KHESED-TEK Systems<br>
              Technology for the Kingdom<br>
              <a href="https://www.khesed-tek-systems.org">www.khesed-tek-systems.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${data.customerName},

Thank you for your interest in ${data.productTitle}.

${data.productDescription}

\ud83e\udd1d YOUR DONATION TRANSFORMS LIVES

33% of all funds raised through Khesed-Tek Systems goes directly to Fundaci\u00f3n Misi\u00f3n Khesed to support their work in partnership with local programs, churches, and organizations in Colombia and Latin America, helping vulnerable communities with food, clothing, and comprehensive support.

Your contribution not only strengthens you; it restores lives.

---

To complete your donation and access the resource, visit the following link:
${data.paymentLink}

${data.coverProcessingFees && data.basePrice && data.processingFee && data.totalPrice ? `
YOUR DONATION BREAKDOWN:
- Base contribution: $${data.basePrice.toFixed(2)} USD
- Processing costs: +$${data.processingFee.toFixed(2)} USD
- TOTAL: $${data.totalPrice.toFixed(2)} USD

Thank you for helping us cover the costs! This means that 100% of your base contribution goes directly to the resource and supporting vulnerable communities.
` : `Suggested contribution: ${data.basePrice ? `$${data.basePrice.toFixed(2)}` : '$9.99'} USD`}

Once you complete your donation, you will immediately receive an email with the download link.

If you have any questions, please don't hesitate to reply to this email.

Blessings,
KHESED-TEK Team

---
KHESED-TEK Systems
Technology for the Kingdom
https://www.khesed-tek-systems.org
      `,
    };
  }
}

/**
 * Download link email (sent after successful donation)
 */
export interface DownloadEmailData {
  customerName: string;
  productType: ProductType;
  language: Language;
  downloadLink: string;
  productTitle: string;
  expiresInHours: number;
}

export function getDownloadLinkEmailTemplate(data: DownloadEmailData): { subject: string; html: string; text: string } {
  const isSpanish = data.language === 'es';
  
  if (isSpanish) {
    return {
      subject: `\u00a1Tu descarga est\u00e1 lista! - ${data.productTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .mission-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>\u00a1Donaci\u00f3n Confirmada! \ud83c\udf89</h1>
            </div>
            <div class="content">
              <p>Hola ${data.customerName},</p>
              
              <p>\u00a1Gracias por tu generosa donaci\u00f3n para <strong>${data.productTitle}</strong>!</p>
              
              <p>Tu donaci\u00f3n ha sido procesada exitosamente. Puedes descargar tu e-book haciendo clic en el siguiente bot\u00f3n:</p>
              
              <div style="text-align: center;">
                <a href="${data.downloadLink}" class="button">Descargar E-book (PDF)</a>
              </div>
              
              <p><small>O copia y pega este enlace en tu navegador:<br>${data.downloadLink}</small></p>
              
              <div class="alert">
                <strong>\u26a0\ufe0f Importante:</strong> Este enlace de descarga expirar\u00e1 en ${data.expiresInHours} horas. Por favor, descarga tu e-book pronto.
              </div>
              
              <p><strong>Consejos:</strong></p>
              <ul>
                <li>Guarda el archivo PDF en un lugar seguro en tu dispositivo</li>
                <li>Puedes leer el PDF en cualquier lector de PDFs (Adobe Reader, navegador web, etc.)</li>
                <li>Si tienes problemas para descargar, responde a este correo</li>
              </ul>
              
              <div class="mission-box">
                <h3 style="margin-top: 0; color: #4caf50;">\ud83d\udc9a Gracias por transformar vidas</h3>
                <p style="margin: 0; font-size: 14px;">
                  Como parte de nuestra misión de transparencia, queremos que sepas que <strong>el 33% de tu donación</strong> ya está siendo destinado a Fundación Misión Khesed para apoyar su trabajo en alianza con programas locales, iglesias y organizaciones. Juntos estamos llevando esperanza a comunidades vulnerables en Colombia y Latinoamérica, ayudando con alimentos, ropa y apoyo integral.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 14px; font-weight: bold; color: #4caf50;">
                  Tu donaci\u00f3n no solo te fortalece a ti; est\u00e1 transformando vidas.
                </p>
              </div>
              
              <p>\u00a1Disfruta tu lectura y que Dios te bendiga!</p>
              
              <p>Bendiciones,<br>
              <strong>Equipo KHESED-TEK</strong></p>
            </div>
            <div class="footer">
              <p>KHESED-TEK Systems<br>
              Tecnolog\u00eda para el Reino<br>
              <a href="https://www.khesed-tek-systems.org">www.khesed-tek-systems.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hola ${data.customerName},

\u00a1Gracias por tu generosa donaci\u00f3n para ${data.productTitle}!

Tu donaci\u00f3n ha sido procesada exitosamente. Puedes descargar tu e-book en el siguiente enlace:

${data.downloadLink}

\u26a0\ufe0f IMPORTANTE: Este enlace de descarga expirar\u00e1 en ${data.expiresInHours} horas. Por favor, descarga tu e-book pronto.

Consejos:
- Guarda el archivo PDF en un lugar seguro en tu dispositivo
- Puedes leer el PDF en cualquier lector de PDFs (Adobe Reader, navegador web, etc.)
- Si tienes problemas para descargar, responde a este correo

\ud83d\udc9a GRACIAS POR TRANSFORMAR VIDAS

Como parte de nuestra misi\u00f3n de transparencia, queremos que sepas que el 33% de tu donaci\u00f3n ya est\u00e1 siendo destinado a Fundaci\u00f3n Misi\u00f3n Khesed para apoyar su trabajo en alianza con programas locales, iglesias y organizaciones. Juntos estamos llevando esperanza a comunidades vulnerables en Colombia y Latinoam\u00e9rica, ayudando con alimentos, ropa y apoyo integral.

Tu donaci\u00f3n no solo te fortalece a ti; est\u00e1 transformando vidas.

\u00a1Disfruta tu lectura y que Dios te bendiga!

Bendiciones,
Equipo KHESED-TEK

---
KHESED-TEK Systems
Tecnolog\u00eda para el Reino
https://www.khesed-tek-systems.org
      `,
    };
  } else {
    return {
      subject: `Your download is ready! - ${data.productTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .mission-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Donation Confirmed! \ud83c\udf89</h1>
            </div>
            <div class="content">
              <p>Hello ${data.customerName},</p>
              
              <p>Thank you for your generous donation for <strong>${data.productTitle}</strong>!</p>
              
              <p>Your donation has been successfully processed. You can download your e-book by clicking the button below:</p>
              
              <div style="text-align: center;">
                <a href="${data.downloadLink}" class="button">Download E-book (PDF)</a>
              </div>
              
              <p><small>Or copy and paste this link into your browser:<br>${data.downloadLink}</small></p>
              
              <div class="alert">
                <strong>\u26a0\ufe0f Important:</strong> This download link will expire in ${data.expiresInHours} hours. Please download your e-book soon.
              </div>
              
              <p><strong>Tips:</strong></p>
              <ul>
                <li>Save the PDF file to a secure location on your device</li>
                <li>You can read the PDF in any PDF reader (Adobe Reader, web browser, etc.)</li>
                <li>If you have trouble downloading, please reply to this email</li>
              </ul>
              
              <div class="mission-box">
                <h3 style="margin-top: 0; color: #4caf50;">\ud83d\udc9a Thank you for transforming lives</h3>
                <p style="margin: 0; font-size: 14px;">
                  As part of our mission of transparency, we want you to know that <strong>33% of your donation</strong> is already being allocated to Fundación Misión Khesed to support their work in partnership with local programs, churches, and organizations. Together we are bringing hope to vulnerable communities in Colombia and Latin America, helping with food, clothing, and comprehensive support.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 14px; font-weight: bold; color: #4caf50;">
                  Your donation not only strengthens you; it is transforming lives.
                </p>
              </div>
              
              <p>Enjoy your reading and God bless you!</p>
              
              <p>Blessings,<br>
              <strong>KHESED-TEK Team</strong></p>
            </div>
            <div class="footer">
              <p>KHESED-TEK Systems<br>
              Technology for the Kingdom<br>
              <a href="https://www.khesed-tek-systems.org">www.khesed-tek-systems.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${data.customerName},

Thank you for your generous donation for ${data.productTitle}!

Your donation has been successfully processed. You can download your e-book at the following link:

${data.downloadLink}

\u26a0\ufe0f IMPORTANT: This download link will expire in ${data.expiresInHours} hours. Please download your e-book soon.

Tips:
- Save the PDF file to a secure location on your device
- You can read the PDF in any PDF reader (Adobe Reader, web browser, etc.)
- If you have trouble downloading, please reply to this email

\ud83d\udc9a THANK YOU FOR TRANSFORMING LIVES

As part of our mission of transparency, we want you to know that 33% of your donation is already being allocated to Fundaci\u00f3n Misi\u00f3n Khesed to support their work in partnership with local programs, churches, and organizations. Together we are bringing hope to vulnerable communities in Colombia and Latin America, helping with food, clothing, and comprehensive support.

Your donation not only strengthens you; it is transforming lives.

Enjoy your reading and God bless you!

Blessings,
KHESED-TEK Team

---
KHESED-TEK Systems
Technology for the Kingdom
https://www.khesed-tek-systems.org
      `,
    };
  }
}

/**
 * Journal App interest email (for future product)
 */
export function getJournalAppInterestEmailTemplate(customerName: string, language: Language): { subject: string; html: string; text: string } {
  const isSpanish = language === 'es';
  
  if (isSpanish) {
    return {
      subject: 'Gracias por tu interés en Mi Identidad Real',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Gracias por tu interés!</h1>
            </div>
            <div class="content">
              <p>Hola ${customerName},</p>
              
              <p>Gracias por tu interés en <strong>Mi Identidad Real (Real ID Journal App)</strong>.</p>
              
              <p>Actualmente estamos trabajando en el lanzamiento de esta aplicación de diario espiritual que te ayudará a descubrir y afirmar tu verdadera identidad en Cristo.</p>
              
              <p>Te avisaremos en cuanto esté disponible. Serás uno de los primeros en saberlo.</p>
              
              <p>Mientras tanto, te invitamos a explorar nuestros e-books disponibles que también te ayudarán en tu crecimiento espiritual.</p>
              
              <p>Bendiciones,<br>
              <strong>Equipo KHESED-TEK</strong></p>
            </div>
            <div class="footer">
              <p>KHESED-TEK Systems<br>
              Tecnología para el Reino<br>
              <a href="https://khesed-tek-systems.org">khesed-tek-systems.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hola ${customerName},

Gracias por tu interés en Mi Identidad Real (Real ID Journal App).

Actualmente estamos trabajando en el lanzamiento de esta aplicación de diario espiritual que te ayudará a descubrir y afirmar tu verdadera identidad en Cristo.

Te avisaremos en cuanto esté disponible. Serás uno de los primeros en saberlo.

Mientras tanto, te invitamos a explorar nuestros e-books disponibles que también te ayudarán en tu crecimiento espiritual.

Bendiciones,
Equipo KHESED-TEK

---
KHESED-TEK Systems
Tecnología para el Reino
https://khesed-tek-systems.org
      `,
    };
  } else {
    return {
      subject: 'Thank you for your interest in Real ID',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9922A 0%, #F0B83C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Interest!</h1>
            </div>
            <div class="content">
              <p>Hello ${customerName},</p>
              
              <p>Thank you for your interest in <strong>Real ID (Mi Identidad Real Journal App)</strong>.</p>
              
              <p>We are currently working on launching this spiritual journal app that will help you discover and affirm your true identity in Christ.</p>
              
              <p>We will notify you as soon as it becomes available. You'll be one of the first to know.</p>
              
              <p>In the meantime, we invite you to explore our available e-books that will also help you in your spiritual growth.</p>
              
              <p>Blessings,<br>
              <strong>KHESED-TEK Team</strong></p>
            </div>
            <div class="footer">
              <p>KHESED-TEK Systems<br>
              Technology for the Kingdom<br>
              <a href="https://khesed-tek-systems.org">khesed-tek-systems.org</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello ${customerName},

Thank you for your interest in Real ID (Mi Identidad Real Journal App).

We are currently working on launching this spiritual journal app that will help you discover and affirm your true identity in Christ.

We will notify you as soon as it becomes available. You'll be one of the first to know.

In the meantime, we invite you to explore our available e-books that will also help you in your spiritual growth.

Blessings,
KHESED-TEK Team

---
KHESED-TEK Systems
Technology for the Kingdom
https://khesed-tek-systems.org
      `,
    };
  }
}
