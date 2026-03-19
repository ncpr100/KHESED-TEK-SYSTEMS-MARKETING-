'use client';

/**
 * Product Request Form
 * Form for requesting E-books (via donation) and registering interest in Journal App
 */

import { useState, useMemo } from 'react';
import { ProductType, Language } from '@/types/products';
import { getPriceWithFee } from '@/lib/products/catalog';

interface ProductOption {
  value: ProductType;
  labelES: string;
  labelEN: string;
}

const PRODUCT_OPTIONS: ProductOption[] = [
  {
    value: 'ebook_peace',
    labelES: 'E-book: Paz en la Tormenta / Peace in the Storm',
    labelEN: 'E-book: Peace in the Storm / Paz en la Tormenta',
  },
  {
    value: 'ebook_blooming',
    labelES: 'E-book: Floreciendo en el Fuego / Blooming in the Fire',
    labelEN: 'E-book: Blooming in the Fire / Floreciendo en el Fuego',
  },
  {
    value: 'ebook_impactful',
    labelES: 'E-book: Vida de Impacto / Impactful Living',
    labelEN: 'E-book: Impactful Living / Vida de Impacto',
  },
  {
    value: 'journal_app',
    labelES: 'Journal App: Mi Identidad Real / Real ID (Próximamente)',
    labelEN: 'Journal App: Real ID / Mi Identidad Real (Coming Soon)',
  },
];

export default function ProductRequestForm() {
  const [language, setLanguage] = useState<Language>('es');
  const [formData, setFormData] = useState({
    productType: '' as ProductType | '',
    customerName: '',
    customerEmail: '',
    country: '',
  });
  const [coverProcessingFees, setCoverProcessingFees] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isSpanish = language === 'es';

  // Calculate pricing with fees
  const pricing = useMemo(() => {
    if (!formData.productType) return null;
    return getPriceWithFee(formData.productType as ProductType);
  }, [formData.productType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/products/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language,
          coverProcessingFees,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setMessage({
          type: 'success',
          text: isSpanish
            ? '¡Gracias por tu generosidad! Revisa tu correo electrónico para completar tu donación.'
            : 'Thank you for your generosity! Check your email to complete your donation.',
        });
        // Reset form
        setFormData({
          productType: '',
          customerName: '',
          customerEmail: '',
          country: '',
        });
        setCoverProcessingFees(false);
      } else {
        setMessage({
          type: 'error',
          text: data.error || (isSpanish
            ? 'Hubo un error. Por favor, intenta de nuevo.'
            : 'An error occurred. Please try again.'),
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: isSpanish
          ? 'Error de conexión. Por favor, verifica tu internet e intenta de nuevo.'
          : 'Connection error. Please check your internet and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #6ee7ff 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Language Toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-lg border border-[#232329] overflow-hidden">
          <button
            onClick={() => setLanguage('es')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              language === 'es'
                ? 'bg-gradient-to-r from-[#6ee7ff] to-[#8b5cf6] text-white'
                : 'bg-[#17171a] text-[#9ca3af] hover:text-white'
            }`}
          >
            Español
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              language === 'en'
                ? 'bg-gradient-to-r from-[#6ee7ff] to-[#8b5cf6] text-white'
                : 'bg-[#17171a] text-[#9ca3af] hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Mission Banner - 33% Message */}
      <div className="mb-8 p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(110, 231, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', border: '1px solid rgba(110, 231, 255, 0.2)' }}>
        <h3 className="text-lg font-bold mb-3 gradient-text">
          {isSpanish ? 'Tecnología y Recursos con Propósito' : 'Technology and Resources with Purpose'}
        </h3>
        <p className="text-sm text-[#e7e7ea] leading-relaxed mb-3">
          {isSpanish
            ? 'En Khesed-Tek Systems, cada donación no es solo una transacción, es una alianza. El 33% de todos los fondos recaudados a través de nuestros productos y servicios se destina directamente a financiar los programas de rehabilitación de Fundación Misión Khesed, transformando vidas de personas en situación de adicción, alcoholismo e indigencia en Colombia y Latinoamérica.'
            : 'At Khesed-Tek Systems, every donation is not just a transaction, it\'s a partnership. 33% of all funds raised through our products and services goes directly to funding the rehabilitation programs of Fundación Misión Khesed, transforming the lives of people struggling with addiction, alcoholism, and homelessness in Colombia and Latin America.'}
        </p>
        <p className="text-sm font-semibold text-[#6ee7ff]">
          {isSpanish
            ? 'Tu contribución no solo te fortalece a ti; restaura vidas.'
            : 'Your contribution not only strengthens you; it restores lives.'}
        </p>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">
            {isSpanish ? 'Contribuir con tu Donación' : 'Contribute with Your Donation'}
          </span>
        </h1>
        <p className="text-[#9ca3af]">
          {isSpanish
            ? 'Completa el formulario y recibirás un enlace de donación seguro por correo electrónico'
            : 'Complete the form and you will receive a secure donation link via email'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Product Selection */}
        <div>
          <label htmlFor="productType" className="block text-sm font-medium mb-2 text-[#e7e7ea]">
            {isSpanish ? 'Producto *' : 'Product *'}
          </label>
          <select
            id="productType"
            required
            value={formData.productType}
            onChange={(e) => setFormData({ ...formData, productType: e.target.value as ProductType })}
            className="w-full px-4 py-3 rounded-lg bg-[#17171a] border border-[#232329] text-[#e7e7ea] focus:border-[#6ee7ff] focus:outline-none transition-colors"
          >
            <option value="">
              {isSpanish ? '-- Selecciona un producto --' : '-- Select a product --'}
            </option>
            {PRODUCT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {isSpanish ? option.labelES : option.labelEN}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium mb-2 text-[#e7e7ea]">
            {isSpanish ? 'Nombre completo *' : 'Full name *'}
          </label>
          <input
            type="text"
            id="customerName"
            required
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder={isSpanish ? 'Juan Pérez' : 'John Doe'}
            className="w-full px-4 py-3 rounded-lg bg-[#17171a] border border-[#232329] text-[#e7e7ea] placeholder-[#6b7280] focus:border-[#6ee7ff] focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium mb-2 text-[#e7e7ea]">
            {isSpanish ? 'Correo electrónico *' : 'Email address *'}
          </label>
          <input
            type="email"
            id="customerEmail"
            required
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
            placeholder={isSpanish ? 'tu@correo.com' : 'you@email.com'}
            className="w-full px-4 py-3 rounded-lg bg-[#17171a] border border-[#232329] text-[#e7e7ea] placeholder-[#6b7280] focus:border-[#6ee7ff] focus:outline-none transition-colors"
          />
        </div>

        {/* Country (Optional) */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-2 text-[#e7e7ea]">
            {isSpanish ? 'País (opcional)' : 'Country (optional)'}
          </label>
          <input
            type="text"
            id="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder={isSpanish ? 'Colombia' : 'Colombia'}
            className="w-full px-4 py-3 rounded-lg bg-[#17171a] border border-[#232329] text-[#e7e7ea] placeholder-[#6b7280] focus:border-[#6ee7ff] focus:outline-none transition-colors"
          />
          <p className="mt-1 text-xs text-[#6b7280]">
            {isSpanish
              ? 'Útil para cuestiones fiscales en Paddle'
              : 'Helpful for tax purposes in Paddle'}
          </p>
        </div>

        {/* Processing Fees Checkbox (only show when product selected) */}
        {formData.productType && pricing && (
          <div className="p-4 rounded-lg bg-[#17171a] border border-[#232329]">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={coverProcessingFees}
                onChange={(e) => setCoverProcessingFees(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#232329] bg-[#0e0e10] text-[#6ee7ff] focus:ring-[#6ee7ff] focus:ring-offset-0"
              />
              <span className="ml-3 flex-1">
                <span className="block text-sm font-medium text-[#e7e7ea]">
                  {isSpanish
                    ? '¿Deseas ayudarnos a cubrir los costos de procesamiento?'
                    : 'Would you like to help us cover the processing costs?'}
                </span>
                <span className="block text-xs text-[#9ca3af] mt-1">
                  {isSpanish
                    ? `Esto ayuda a que el 100% de tu donación llegue al recurso y misión (+$${pricing.fee.toFixed(2)} USD)`
                    : `This helps ensure 100% of your donation reaches the resource and mission (+$${pricing.fee.toFixed(2)} USD)`}
                </span>
              </span>
            </label>
            
            {/* Price Breakdown */}
            <div className="mt-3 pt-3 border-t border-[#232329] text-sm">
              <div className="flex justify-between text-[#9ca3af]">
                <span>{isSpanish ? 'Aporte base' : 'Base contribution'}:</span>
                <span>${pricing.basePrice.toFixed(2)} USD</span>
              </div>
              {coverProcessingFees && (
                <div className="flex justify-between text-[#9ca3af] mt-1">
                  <span>{isSpanish ? 'Costos de procesamiento' : 'Processing costs'}:</span>
                  <span>+${pricing.fee.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#e7e7ea] mt-2 pt-2 border-t border-[#232329]">
                <span>{isSpanish ? 'Total' : 'Total'}:</span>
                <span>${coverProcessingFees ? pricing.total.toFixed(2) : pricing.basePrice.toFixed(2)} USD</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="gradient-btn w-full py-3 px-6 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? (isSpanish ? 'Procesando...' : 'Processing...')
            : (isSpanish ? 'Continuar con Donación' : 'Continue with Donation')}
        </button>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-900/20 border border-green-500 text-green-300'
                : 'bg-red-900/20 border border-red-500 text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Info */}
        <div className="text-center text-sm text-[#9ca3af]">
          <p>
            {isSpanish
              ? '* No se solicitan datos de tarjeta en este formulario'
              : '* No card details are requested in this form'}
          </p>
          <p className="mt-1">
            {isSpanish
              ? 'Recibirás un enlace de donación seguro por correo electrónico'
              : 'You will receive a secure donation link via email'}
          </p>
        </div>
      </form>
    </div>
  );
}
