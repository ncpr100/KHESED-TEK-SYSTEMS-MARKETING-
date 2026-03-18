'use client';

/**
 * Product Request Form
 * Form for purchasing E-books and registering interest in Journal App
 */

import { useState } from 'react';
import { ProductType, Language } from '@/types/products';

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isSpanish = language === 'es';

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
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setMessage({
          type: 'success',
          text: isSpanish
            ? '¡Éxito! Revisa tu correo electrónico para continuar.'
            : 'Success! Check your email to continue.',
        });
        // Reset form
        setFormData({
          productType: '',
          customerName: '',
          customerEmail: '',
          country: '',
        });
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

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">
            {isSpanish ? 'Solicitar Producto' : 'Request Product'}
          </span>
        </h1>
        <p className="text-[#9ca3af]">
          {isSpanish
            ? 'Completa el formulario y recibirás un enlace de pago por correo electrónico'
            : 'Complete the form and you will receive a payment link via email'}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="gradient-btn w-full py-3 px-6 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? (isSpanish ? 'Procesando...' : 'Processing...')
            : (isSpanish ? 'Solicitar Producto' : 'Request Product')}
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
              ? '* No se solicitan datos de pago en este formulario'
              : '* No payment data is requested in this form'}
          </p>
          <p className="mt-1">
            {isSpanish
              ? 'Recibirás un enlace de pago seguro por correo electrónico'
              : 'You will receive a secure payment link via email'}
          </p>
        </div>
      </form>
    </div>
  );
}
