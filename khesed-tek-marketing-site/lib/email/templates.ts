import { EmailTemplate, EmailCategory } from './types';

// Template variable replacement
export function replaceTemplateVariables(
  content: string, 
  variables: Record<string, any>
): string {
  let result = content;
  
  // Replace {{variable}} patterns
  for (const [key, value] of Object.entries(variables)) {
    const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(pattern, String(value || ''));
  }
  
  // Remove unused variables
  result = result.replace(/{{[^}]+}}/g, '');
  
  return result;
}

// Extract variables from template content
export function extractTemplateVariables(content: string): string[] {
  const matches = content.match(/{{([^}]+)}}/g) || [];
  return matches.map(match => match.replace(/[{}]/g, '').trim());
}

// Default email templates for KHESED-TEK
export const defaultTemplates: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Welcome Series
  {
    name: 'Bienvenida - Primer contacto',
    subject: '¡Bienvenido a KHESED-TEK, {{firstName}}!',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1e293b; margin: 0;">¡Bienvenido a KHESED-TEK!</h1>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Hola {{firstName}},
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Gracias por tu interés en KHESED-TEK. Nos emociona que estés considerando nuestras soluciones tecnológicas para {{company}}.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          En los próximos días recibirás información valiosa sobre cómo nuestras herramientas pueden transformar la gestión digital de tu iglesia u organización.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{websiteUrl}}/contact" style="background: linear-gradient(90deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Programa tu Demo Gratuita
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
          ¿Tienes preguntas? Simplemente responde a este correo.<br>
          Bendiciones,<br>
          El equipo de KHESED-TEK
        </p>
      </div>
    `,
    textContent: `
¡Bienvenido a KHESED-TEK!

Hola {{firstName}},

Gracias por tu interés en KHESED-TEK. Nos emociona que estés considerando nuestras soluciones tecnológicas para {{company}}.

En los próximos días recibirás información valiosa sobre cómo nuestras herramientas pueden transformar la gestión digital de tu iglesia u organización.

Programa tu demo gratuita: {{websiteUrl}}/contact

¿Tienes preguntas? Simplemente responde a este correo.

Bendiciones,
El equipo de KHESED-TEK
    `,
    variables: ['firstName', 'company', 'websiteUrl'],
    category: EmailCategory.WELCOME,
    language: 'es',
    active: true,
  },

  // Demo Follow-up
  {
    name: 'Seguimiento Demo - Día 1',
    subject: 'Tu demo de KHESED-TEK está lista, {{firstName}}',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e293b;">Tu Demo Personalizada Está Lista</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Hola {{firstName}},
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Hemos preparado una demostración personalizada de nuestras soluciones para {{company}}. En esta demo verás:
        </p>
        
        <ul style="font-size: 16px; line-height: 1.8; color: #475569;">
          <li>Sistema de gestión de miembros</li>
          <li>Plataforma de donaciones en línea</li>
          <li>Herramientas de comunicación</li>
          <li>Reportes y análisis</li>
        </ul>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #0f172a; margin-top: 0;">¿Sabías que...?</h3>
          <p style="margin-bottom: 0; color: #475569;">
            Las iglesias que implementan soluciones digitales ven un aumento promedio del 30% en la participación de sus miembros.
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{demoUrl}}" style="background: linear-gradient(90deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Ver Mi Demo Ahora
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b;">
          Si prefieres agendar una llamada personal, simplemente responde a este correo.
        </p>
      </div>
    `,
    textContent: `
Tu Demo Personalizada Está Lista

Hola {{firstName}},

Hemos preparado una demostración personalizada de nuestras soluciones para {{company}}. En esta demo verás:

- Sistema de gestión de miembros
- Plataforma de donaciones en línea  
- Herramientas de comunicación
- Reportes y análisis

¿Sabías que las iglesias que implementan soluciones digitales ven un aumento promedio del 30% en la participación de sus miembros?

Ver mi demo: {{demoUrl}}

Si prefieres agendar una llamada personal, simplemente responde a este correo.

Bendiciones,
El equipo de KHESED-TEK
    `,
    variables: ['firstName', 'company', 'demoUrl'],
    category: EmailCategory.DEMO_FOLLOW_UP,
    language: 'es',
    active: true,
  },

  // Nurture - Educational
  {
    name: 'Educativo - Transformación Digital',
    subject: '5 Señales de que tu iglesia necesita transformación digital',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e293b;">5 Señales de Que Tu Iglesia Necesita Transformación Digital</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Hola {{firstName}},
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          La transformación digital no es solo una tendencia, es una necesidad para las iglesias modernas. Aquí están las 5 señales principales:
        </p>
        
        <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">1. Gestión Manual de Miembros</h3>
          <p style="color: #475569; margin-bottom: 0;">
            Si aún usas hojas de cálculo o registros en papel, es momento de cambiar.
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">2. Comunicación Fragmentada</h3>
          <p style="color: #475569; margin-bottom: 0;">
            Múltiples plataformas para comunicarse con tu congregación.
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">3. Donaciones Limitadas</h3>
          <p style="color: #475569; margin-bottom: 0;">
            Solo efectivo o cheques, sin opciones digitales.
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">4. Falta de Métricas</h3>
          <p style="color: #475569; margin-bottom: 0;">
            No tienes datos sobre participación y crecimiento.
          </p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">5. Tiempo Administrativo Excesivo</h3>
          <p style="color: #475569; margin-bottom: 0;">
            Más tiempo en administración que en ministerio.
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{websiteUrl}}/contact" style="background: linear-gradient(90deg, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Descubre la Solución
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b;">
          ¿Tu iglesia muestra estas señales? Hablemos sobre cómo KHESED-TEK puede ayudar.
        </p>
      </div>
    `,
    textContent: `
5 Señales de Que Tu Iglesia Necesita Transformación Digital

Hola {{firstName}},

La transformación digital no es solo una tendencia, es una necesidad para las iglesias modernas. Aquí están las 5 señales principales:

1. Gestión Manual de Miembros
Si aún usas hojas de cálculo o registros en papel, es momento de cambiar.

2. Comunicación Fragmentada  
Múltiples plataformas para comunicarse con tu congregación.

3. Donaciones Limitadas
Solo efectivo o cheques, sin opciones digitales.

4. Falta de Métricas
No tienes datos sobre participación y crecimiento.

5. Tiempo Administrativo Excesivo
Más tiempo en administración que en ministerio.

¿Tu iglesia muestra estas señales? Hablemos sobre cómo KHESED-TEK puede ayudar.

Descubre la solución: {{websiteUrl}}/contact

Bendiciones,
El equipo de KHESED-TEK
    `,
    variables: ['firstName', 'websiteUrl'],
    category: EmailCategory.NURTURE,
    language: 'es',
    active: true,
  },

  // Re-engagement
  {
    name: 'Reactivación - Te extrañamos',
    subject: 'Te extrañamos, {{firstName}} - Oferta especial dentro',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e293b;">¡Te Hemos Extrañado!</h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Hola {{firstName}},
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Notamos que hace tiempo no interactúas con nuestro contenido. ¿Sigues interesado en transformar digitalmente {{company}}?
        </p>
        
        <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; text-align: center; margin: 30px 0;">
          <h3 style="color: #92400e; margin-top: 0;">🎁 Oferta Especial de Reenganche</h3>
          <p style="color: #92400e; font-size: 18px; font-weight: bold; margin: 10px 0;">
            20% de descuento en tu primer año
          </p>
          <p style="color: #b45309; margin-bottom: 0;">
            Válido solo por 7 días
          </p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">
          Sabemos que elegir la tecnología correcta para tu iglesia es una decisión importante. Por eso queremos darte esta oportunidad especial para experimentar KHESED-TEK.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="{{websiteUrl}}/contact?promo=reengagement20" style="background: linear-gradient(90deg, #ef4444, #f97316); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Reclamar Mi Descuento
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b; text-align: center;">
          Si ya no deseas recibir estos correos, puedes <a href="{{unsubscribeUrl}}" style="color: #3b82f6;">darte de baja aquí</a>.
        </p>
      </div>
    `,
    textContent: `
¡Te Hemos Extrañado!

Hola {{firstName}},

Notamos que hace tiempo no interactúas con nuestro contenido. ¿Sigues interesado en transformar digitalmente {{company}}?

🎁 OFERTA ESPECIAL DE REENGANCHE
20% de descuento en tu primer año
Válido solo por 7 días

Sabemos que elegir la tecnología correcta para tu iglesia es una decisión importante. Por eso queremos darte esta oportunidad especial para experimentar KHESED-TEK.

Reclamar mi descuento: {{websiteUrl}}/contact?promo=reengagement20

Si ya no deseas recibir estos correos, puedes darte de baja aquí: {{unsubscribeUrl}}

Bendiciones,
El equipo de KHESED-TEK
    `,
    variables: ['firstName', 'company', 'websiteUrl', 'unsubscribeUrl'],
    category: EmailCategory.RE_ENGAGEMENT,
    language: 'es',
    active: true,
  }
];

export class TemplateManager {
  private templates: Map<string, EmailTemplate> = new Map();

  constructor() {
    this.loadDefaultTemplates();
  }

  private loadDefaultTemplates(): void {
    const now = new Date();
    defaultTemplates.forEach((template, index) => {
      const id = `template_${index + 1}`;
      this.templates.set(id, {
        ...template,
        id,
        createdAt: now,
        updatedAt: now,
      });
    });
  }

  getTemplate(id: string): EmailTemplate | undefined {
    return this.templates.get(id);
  }

  getTemplatesByCategory(category: EmailCategory): EmailTemplate[] {
    return Array.from(this.templates.values()).filter(
      template => template.category === category && template.active
    );
  }

  getAllTemplates(): EmailTemplate[] {
    return Array.from(this.templates.values());
  }

  renderTemplate(
    templateId: string, 
    variables: Record<string, any>
  ): { subject: string; html: string; text: string } | null {
    const template = this.getTemplate(templateId);
    if (!template) return null;

    return {
      subject: replaceTemplateVariables(template.subject, variables),
      html: replaceTemplateVariables(template.htmlContent, variables),
      text: replaceTemplateVariables(template.textContent, variables),
    };
  }

  validateTemplate(template: EmailTemplate): string[] {
    const errors: string[] = [];

    if (!template.name.trim()) {
      errors.push('Template name is required');
    }

    if (!template.subject.trim()) {
      errors.push('Subject is required');
    }

    if (!template.htmlContent.trim() && !template.textContent.trim()) {
      errors.push('Either HTML or text content is required');
    }

    // Check for valid variable syntax
    const htmlVariables = extractTemplateVariables(template.htmlContent);
    const textVariables = extractTemplateVariables(template.textContent);
    const subjectVariables = extractTemplateVariables(template.subject);
    
    const allVariables = [...new Set([...htmlVariables, ...textVariables, ...subjectVariables])];
    
    if (allVariables.length !== template.variables.length) {
      errors.push('Template variables do not match content variables');
    }

    return errors;
  }
}