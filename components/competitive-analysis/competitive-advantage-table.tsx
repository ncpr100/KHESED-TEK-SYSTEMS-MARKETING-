'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X, Star, Zap, Globe, DollarSign, Shield, Brain } from 'lucide-react'

interface CompetitorFeature {
  feature: string
  category: 'core' | 'advanced' | 'unique'
  planningCenter: 'full' | 'partial' | 'none' | 'addon'
  breeze: 'full' | 'partial' | 'none' | 'addon'
  churchTrac: 'full' | 'partial' | 'none' | 'addon'
  aplos: 'full' | 'partial' | 'none' | 'addon'
  khesedTek: 'full' | 'partial' | 'none' | 'superior'
  khesedAdvantage?: string
}

interface CompetitiveAdvantageTableProps {
  market?: 'LATAM' | 'USA' | 'GLOBAL'
  language?: 'es' | 'en'
  showPricing?: boolean
  className?: string
}

export default function CompetitiveAdvantageTable({
  market = 'USA',
  language = 'en',
  showPricing = true,
  className = ''
}: CompetitiveAdvantageTableProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'advanced' | 'unique'>('all')

  const features: CompetitorFeature[] = [
    // Core ChMS Features
    {
      feature: language === 'es' ? 'Gestión de Miembros' : 'Member Management',
      category: 'core',
      planningCenter: 'full',
      breeze: 'full', 
      churchTrac: 'full',
      aplos: 'partial',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es' 
        ? 'Gestión espiritual integrada con dones y evaluación automática'
        : 'Integrated spiritual gifts assessment with automated volunteer matching'
    },
    {
      feature: language === 'es' ? 'Donaciones en Línea' : 'Online Giving',
      category: 'core',
      planningCenter: 'full',
      breeze: 'full',
      churchTrac: 'full', 
      aplos: 'full',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'Integración con Nequi, PSE y métodos de pago colombianos'
        : 'Colombian payment methods (Nequi, PSE) + international options'
    },
    {
      feature: language === 'es' ? 'Comunicaciones Masivas' : 'Mass Communications',
      category: 'core',
      planningCenter: 'full',
      breeze: 'full',
      churchTrac: 'full',
      aplos: 'partial',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'WhatsApp Business nativo + SMS + Email integrado'
        : 'Native WhatsApp Business + SMS + Email integration'
    },
    {
      feature: language === 'es' ? 'Gestión de Eventos' : 'Event Management',
      category: 'core',
      planningCenter: 'full',
      breeze: 'full',
      churchTrac: 'full',
      aplos: 'partial',
      khesedTek: 'full'
    },
    {
      feature: language === 'es' ? 'Control de Asistencia' : 'Attendance Tracking',
      category: 'core',
      planningCenter: 'full',
      breeze: 'full',
      churchTrac: 'full',
      aplos: 'partial',
      khesedTek: 'full'
    },

    // Advanced Features
    {
      feature: language === 'es' ? 'Sistema de Voluntarios Inteligente' : 'Smart Volunteer System',
      category: 'advanced',
      planningCenter: 'partial',
      breeze: 'partial',
      churchTrac: 'partial',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'IA para emparejamiento basado en dones espirituales y disponibilidad'
        : 'AI-powered matching based on spiritual gifts and availability'
    },
    {
      feature: language === 'es' ? 'Automatización de Flujos' : 'Workflow Automation',
      category: 'advanced',
      planningCenter: 'partial',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'Motor de automatización completo con triggers personalizados'
        : 'Complete automation engine with custom triggers and workflows'
    },
    {
      feature: language === 'es' ? 'Muro de Oración Inteligente' : 'Smart Prayer Wall',
      category: 'advanced',
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'Seguimiento automatizado con notificaciones pastorales'
        : 'Automated follow-up with pastoral care notifications'
    },
    {
      feature: language === 'es' ? 'Análisis Predictivo' : 'Predictive Analytics',
      category: 'advanced',
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'IA para predicción de asistencia y engagement'
        : 'AI-powered attendance and engagement prediction'
    },
    {
      feature: language === 'es' ? 'Contabilidad de Fondos' : 'Fund Accounting',
      category: 'advanced',
      planningCenter: 'addon',
      breeze: 'none',
      churchTrac: 'full',
      aplos: 'full',
      khesedTek: 'full'
    },

    // Unique KHESED-TEK Features
    {
      feature: language === 'es' ? 'Enfoque Latinoamericano' : 'Latin American Focus',
      category: 'unique',
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'Diseñado específicamente para la cultura y necesidades latinas'
        : 'Specifically designed for Latin American church culture and needs'
    },
    {
      feature: language === 'es' ? 'Soporte Multiidioma Nativo' : 'Native Multi-language',
      category: 'unique',
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'Español-first con adaptación cultural completa'
        : 'Spanish-first with complete cultural adaptation'
    },
    {
      feature: language === 'es' ? 'Integración WhatsApp Business' : 'WhatsApp Business Integration',
      category: 'unique',
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'Canal principal de comunicación en Latinoamérica'
        : 'Primary communication channel for Latin American churches'
    },
    {
      feature: language === 'es' ? 'Métodos de Pago Locales' : 'Local Payment Methods',
      category: 'unique',
      planningCenter: 'none',
      breeze: 'none',
      churchTrac: 'none',
      aplos: 'none',
      khesedTek: 'superior',
      khesedAdvantage: language === 'es'
        ? 'Nequi, PSE, transferencias bancarias colombianas'
        : 'Nequi, PSE, Colombian bank transfers integrated'
    }
  ]

  const pricingData = [
    {
      system: 'Planning Center',
      price: '$35-100+',
      period: language === 'es' ? '/mes' : '/month',
      notes: language === 'es' ? 'Modular, sin límite de usuarios' : 'Modular, no user limits',
      value: 3
    },
    {
      system: 'Breeze ChMS', 
      price: '$67-119',
      period: language === 'es' ? '/mes' : '/month',
      notes: language === 'es' ? 'Por tamaño de iglesia' : 'By church size',
      value: 4
    },
    {
      system: 'ChurchTrac',
      price: '$8-25',
      period: language === 'es' ? '/mes' : '/month', 
      notes: language === 'es' ? 'Por miembros activos' : 'By active members',
      value: 5
    },
    {
      system: 'Aplos',
      price: '$79-229',
      period: language === 'es' ? '/mes' : '/month',
      notes: language === 'es' ? 'Por características' : 'By features',
      value: 2
    },
    {
      system: 'KHESED-TEK',
      price: market === 'LATAM' ? '$89' : '$149',
      period: language === 'es' ? '/mes' : '/month',
      notes: language === 'es' ? 'Todo incluido, cultural' : 'All-inclusive, culturally adapted',
      value: 5
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'full':
        return <Check className="h-4 w-4 text-green-600" />
      case 'superior':
        return <Star className="h-4 w-4 text-yellow-500" />
      case 'partial':
        return <div className="h-4 w-4 rounded-full bg-yellow-400" />
      case 'addon':
        return <DollarSign className="h-4 w-4 text-orange-500" />
      default:
        return <X className="h-4 w-4 text-red-500" />
    }
  }

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: language === 'es' ? 'Todas' : 'All Features' },
          { key: 'core', label: language === 'es' ? 'Esenciales' : 'Core Features' },
          { key: 'advanced', label: language === 'es' ? 'Avanzadas' : 'Advanced' },
          { key: 'unique', label: language === 'es' ? 'Únicas' : 'Unique to KHESED-TEK' }
        ].map(category => (
          <Button
            key={category.key}
            variant={activeCategory === category.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.key as any)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-[var(--brand)]" />
            {language === 'es' 
              ? 'Comparación Detallada de Características'
              : 'Detailed Feature Comparison'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">
                    {language === 'es' ? 'Característica' : 'Feature'}
                  </th>
                  <th className="text-center p-3 font-semibold">Planning Center</th>
                  <th className="text-center p-3 font-semibold">Breeze ChMS</th>
                  <th className="text-center p-3 font-semibold">ChurchTrac</th>
                  <th className="text-center p-3 font-semibold">Aplos</th>
                  <th className="text-center p-3 font-semibold bg-[var(--brand)]/10">
                    <div className="flex items-center justify-center gap-1">
                      <Zap className="h-4 w-4 text-[var(--brand)]" />
                      KHESED-TEK
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feature.feature}</span>
                        {feature.category === 'unique' && (
                          <Badge variant="outline" className="text-xs">
                            {language === 'es' ? 'Único' : 'Unique'}
                          </Badge>
                        )}
                      </div>
                      {feature.khesedAdvantage && (
                        <p className="text-xs text-[var(--muted)] mt-1">
                          <strong>KHESED-TEK:</strong> {feature.khesedAdvantage}
                        </p>
                      )}
                    </td>
                    <td className="text-center p-3">
                      {getStatusIcon(feature.planningCenter)}
                    </td>
                    <td className="text-center p-3">
                      {getStatusIcon(feature.breeze)}
                    </td>
                    <td className="text-center p-3">
                      {getStatusIcon(feature.churchTrac)}
                    </td>
                    <td className="text-center p-3">
                      {getStatusIcon(feature.aplos)}
                    </td>
                    <td className="text-center p-3 bg-[var(--brand)]/5">
                      {getStatusIcon(feature.khesedTek)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              {language === 'es' ? 'Superior' : 'Superior'}
            </div>
            <div className="flex items-center gap-1">
              <Check className="h-3 w-3 text-green-600" />
              {language === 'es' ? 'Completo' : 'Full Feature'}
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              {language === 'es' ? 'Parcial' : 'Partial'}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-orange-500" />
              {language === 'es' ? 'Costo Extra' : 'Add-on Cost'}
            </div>
            <div className="flex items-center gap-1">
              <X className="h-3 w-3 text-red-500" />
              {language === 'es' ? 'No Disponible' : 'Not Available'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Comparison */}
      {showPricing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[var(--brand)]" />
              {language === 'es' ? 'Comparación de Precios' : 'Pricing Comparison'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {pricingData.map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    item.system === 'KHESED-TEK' 
                      ? 'border-[var(--brand)] bg-[var(--brand)]/5' 
                      : 'border-gray-200'
                  }`}
                >
                  <h4 className="font-semibold text-center mb-2">{item.system}</h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{item.price}</div>
                    <div className="text-sm text-[var(--muted)]">{item.period}</div>
                    <div className="text-xs text-[var(--muted)] mt-2">{item.notes}</div>
                  </div>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i}
                        className={`h-3 w-3 ${
                          i < item.value ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Advantages Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[var(--brand)]" />
            {language === 'es' 
              ? 'Ventajas Clave de KHESED-TEK'
              : 'KHESED-TEK Key Advantages'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: <Globe className="h-5 w-5 text-[var(--brand)]" />,
                title: language === 'es' ? 'Enfoque Cultural' : 'Cultural Focus',
                desc: language === 'es' 
                  ? 'Único sistema diseñado específicamente para iglesias latinoamericanas'
                  : 'Only system designed specifically for Latin American churches'
              },
              {
                icon: <Brain className="h-5 w-5 text-[var(--brand)]" />,
                title: language === 'es' ? 'IA Integrada' : 'Integrated AI',
                desc: language === 'es'
                  ? 'Automatización inteligente y emparejamiento de voluntarios'
                  : 'Smart automation and volunteer matching capabilities'
              },
              {
                icon: <Zap className="h-5 w-5 text-[var(--brand)]" />,
                title: language === 'es' ? 'WhatsApp Nativo' : 'Native WhatsApp',
                desc: language === 'es'
                  ? 'Primer sistema ChMS con WhatsApp Business integrado'
                  : 'First ChMS with native WhatsApp Business integration'
              },
              {
                icon: <DollarSign className="h-5 w-5 text-[var(--brand)]" />,
                title: language === 'es' ? 'Pagos Locales' : 'Local Payments',
                desc: language === 'es'
                  ? 'Nequi, PSE y métodos de pago colombianos incluidos'
                  : 'Colombian payment methods (Nequi, PSE) included'
              }
            ].map((advantage, idx) => (
              <div key={idx} className="flex gap-3 p-4 rounded-lg bg-gray-50">
                {advantage.icon}
                <div>
                  <h4 className="font-semibold mb-1">{advantage.title}</h4>
                  <p className="text-sm text-[var(--muted)]">{advantage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}