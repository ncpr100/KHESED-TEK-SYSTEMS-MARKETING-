/**
 * Product Email Templates
 * Email templates for product sales (E-books, Journal App)
 */

import { Language, ProductType } from '@/types/products';
import { getProductTitle, getProductDescription } from '@/lib/products/catalog';

/**
 * Payment link email (sent after form submission)
 */
export interface PaymentEmailData {
  customerName: string;
  productType: ProductType;
  language: Language;
  paymentLink: string;
  productTitle: string;
  productDescription: string;
}

export function getPaymentLinkEmailTemplate(data: PaymentEmailData): { subject: string; html: string; text: string } {
  const isSpanish = data.language === 'es';
  
  if (isSpanish) {
    return {
      subject: `Tu enlace de pago para "${data.productTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Gracias por tu interés!</h1>
            </div>
            <div class="content">
              <p>Hola ${data.customerName},</p>
              
              <p>Gracias por tu interés en <strong>${data.productTitle}</strong>.</p>
              
              <p>${data.productDescription}</p>
              
              <p>Para completar tu compra, haz clic en el siguiente botón:</p>
              
              <div style="text-align: center;">
                <a href="${data.paymentLink}" class="button">Completar Pago Seguro</a>
              </div>
              
              <p><small>O copia y pega este enlace en tu navegador:<br>${data.paymentLink}</small></p>
              
              <p><strong>Precio:</strong> $9.99 USD</p>
              
              <p>Una vez que completes el pago, recibirás inmediatamente un correo con el enlace de descarga.</p>
              
              <p>Si tienes alguna pregunta, no dudes en responder a este correo.</p>
              
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
Hola ${data.customerName},

Gracias por tu interés en ${data.productTitle}.

${data.productDescription}

Para completar tu compra, visita el siguiente enlace:
${data.paymentLink}

Precio: $9.99 USD

Una vez que completes el pago, recibirás inmediatamente un correo con el enlace de descarga.

Si tienes alguna pregunta, no dudes en responder a este correo.

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
      subject: `Your payment link for "${data.productTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Interest!</h1>
            </div>
            <div class="content">
              <p>Hello ${data.customerName},</p>
              
              <p>Thank you for your interest in <strong>${data.productTitle}</strong>.</p>
              
              <p>${data.productDescription}</p>
              
              <p>To complete your purchase, click the button below:</p>
              
              <div style="text-align: center;">
                <a href="${data.paymentLink}" class="button">Complete Secure Payment</a>
              </div>
              
              <p><small>Or copy and paste this link into your browser:<br>${data.paymentLink}</small></p>
              
              <p><strong>Price:</strong> $9.99 USD</p>
              
              <p>Once you complete the payment, you will immediately receive an email with the download link.</p>
              
              <p>If you have any questions, please don't hesitate to reply to this email.</p>
              
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
Hello ${data.customerName},

Thank you for your interest in ${data.productTitle}.

${data.productDescription}

To complete your purchase, visit the following link:
${data.paymentLink}

Price: $9.99 USD

Once you complete the payment, you will immediately receive an email with the download link.

If you have any questions, please don't hesitate to reply to this email.

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

/**
 * Download link email (sent after successful payment)
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
      subject: `¡Tu descarga está lista! - ${data.productTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Pago Confirmado! 🎉</h1>
            </div>
            <div class="content">
              <p>Hola ${data.customerName},</p>
              
              <p>¡Gracias por tu compra de <strong>${data.productTitle}</strong>!</p>
              
              <p>Tu pago ha sido procesado exitosamente. Puedes descargar tu e-book haciendo clic en el siguiente botón:</p>
              
              <div style="text-align: center;">
                <a href="${data.downloadLink}" class="button">Descargar E-book (PDF)</a>
              </div>
              
              <p><small>O copia y pega este enlace en tu navegador:<br>${data.downloadLink}</small></p>
              
              <div class="alert">
                <strong>⚠️ Importante:</strong> Este enlace de descarga expirará en ${data.expiresInHours} horas. Por favor, descarga tu e-book pronto.
              </div>
              
              <p><strong>Consejos:</strong></p>
              <ul>
                <li>Guarda el archivo PDF en un lugar seguro en tu dispositivo</li>
                <li>Puedes leer el PDF en cualquier lector de PDFs (Adobe Reader, navegador web, etc.)</li>
                <li>Si tienes problemas para descargar, responde a este correo</li>
              </ul>
              
              <p>¡Disfruta tu lectura y que Dios te bendiga!</p>
              
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
Hola ${data.customerName},

¡Gracias por tu compra de ${data.productTitle}!

Tu pago ha sido procesado exitosamente. Puedes descargar tu e-book en el siguiente enlace:

${data.downloadLink}

⚠️ IMPORTANTE: Este enlace de descarga expirará en ${data.expiresInHours} horas. Por favor, descarga tu e-book pronto.

Consejos:
- Guarda el archivo PDF en un lugar seguro en tu dispositivo
- Puedes leer el PDF en cualquier lector de PDFs (Adobe Reader, navegador web, etc.)
- Si tienes problemas para descargar, responde a este correo

¡Disfruta tu lectura y que Dios te bendiga!

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
      subject: `Your download is ready! - ${data.productTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .alert { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Confirmed! 🎉</h1>
            </div>
            <div class="content">
              <p>Hello ${data.customerName},</p>
              
              <p>Thank you for purchasing <strong>${data.productTitle}</strong>!</p>
              
              <p>Your payment has been successfully processed. You can download your e-book by clicking the button below:</p>
              
              <div style="text-align: center;">
                <a href="${data.downloadLink}" class="button">Download E-book (PDF)</a>
              </div>
              
              <p><small>Or copy and paste this link into your browser:<br>${data.downloadLink}</small></p>
              
              <div class="alert">
                <strong>⚠️ Important:</strong> This download link will expire in ${data.expiresInHours} hours. Please download your e-book soon.
              </div>
              
              <p><strong>Tips:</strong></p>
              <ul>
                <li>Save the PDF file to a secure location on your device</li>
                <li>You can read the PDF in any PDF reader (Adobe Reader, web browser, etc.)</li>
                <li>If you have trouble downloading, please reply to this email</li>
              </ul>
              
              <p>Enjoy your reading and God bless you!</p>
              
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
Hello ${data.customerName},

Thank you for purchasing ${data.productTitle}!

Your payment has been successfully processed. You can download your e-book at the following link:

${data.downloadLink}

⚠️ IMPORTANT: This download link will expire in ${data.expiresInHours} hours. Please download your e-book soon.

Tips:
- Save the PDF file to a secure location on your device
- You can read the PDF in any PDF reader (Adobe Reader, web browser, etc.)
- If you have trouble downloading, please reply to this email

Enjoy your reading and God bless you!

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
            .header { background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
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
            .header { background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
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
