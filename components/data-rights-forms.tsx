'use client';

import React, { useState } from 'react';
import { DataCategory, ExportFormat, DeletionReason } from '@/lib/gdpr/types';

export function DataExportForm() {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<DataCategory[]>([]);
  const [format, setFormat] = useState<ExportFormat>(ExportFormat.JSON);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; requestId?: string } | null>(null);

  const dataCategories = [
    { value: DataCategory.PERSONAL_IDENTIFIERS, label: 'Información Personal', description: 'Nombre, email, teléfono' },
    { value: DataCategory.CONTACT_INFORMATION, label: 'Información de Contacto', description: 'Direcciones y detalles de contacto' },
    { value: DataCategory.BEHAVIORAL_DATA, label: 'Datos de Comportamiento', description: 'Interacciones con el sitio web, analytics' },
    { value: DataCategory.MARKETING_DATA, label: 'Datos de Marketing', description: 'Preferencias de email, campañas' },
    { value: DataCategory.TECHNICAL_DATA, label: 'Datos Técnicos', description: 'IP, navegador, dispositivo' },
    { value: DataCategory.COMMUNICATION_DATA, label: 'Datos de Comunicación', description: 'Emails, chats, formularios' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/gdpr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request_data_export',
          data: {
            email,
            dataCategories: selectedCategories.length > 0 ? selectedCategories : Object.values(DataCategory),
            format
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({
          success: true,
          message: data.message,
          requestId: data.requestId
        });
        setEmail('');
        setSelectedCategories([]);
      } else {
        setResult({
          success: false,
          message: data.error || 'Error al procesar la solicitud'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Error de conexión. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: DataCategory, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Solicitar Exportación de Datos</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Solicita una copia de todos los datos personales que tenemos sobre ti. 
        Recibirás un email con un enlace de descarga cuando esté listo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Formato de Exportación
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as ExportFormat)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={ExportFormat.JSON}>JSON (Estructurado)</option>
            <option value={ExportFormat.CSV}>CSV (Hoja de Cálculo)</option>
            <option value={ExportFormat.PDF}>PDF (Documento)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Categorías de Datos (opcional - se incluirán todas si no seleccionas ninguna)
          </label>
          <div className="space-y-3">
            {dataCategories.map((category) => (
              <div key={category.value} className="flex items-start">
                <input
                  type="checkbox"
                  id={category.value}
                  checked={selectedCategories.includes(category.value)}
                  onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3">
                  <label htmlFor={category.value} className="text-sm font-medium">
                    {category.label}
                  </label>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Procesando...' : 'Solicitar Exportación'}
        </button>
      </form>

      {result && (
        <div className={`mt-4 p-4 rounded-md ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <p>{result.message}</p>
          {result.requestId && (
            <p className="text-sm mt-2">
              ID de solicitud: <code className="bg-green-100 px-1 rounded">{result.requestId}</code>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function DataDeletionForm() {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<DataCategory[]>([]);
  const [reason, setReason] = useState<DeletionReason>(DeletionReason.USER_REQUEST);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; requestId?: string; verificationCode?: string } | null>(null);

  const dataCategories = [
    { value: DataCategory.PERSONAL_IDENTIFIERS, label: 'Información Personal' },
    { value: DataCategory.CONTACT_INFORMATION, label: 'Información de Contacto' },
    { value: DataCategory.BEHAVIORAL_DATA, label: 'Datos de Comportamiento' },
    { value: DataCategory.MARKETING_DATA, label: 'Datos de Marketing' },
    { value: DataCategory.TECHNICAL_DATA, label: 'Datos Técnicos' },
    { value: DataCategory.COMMUNICATION_DATA, label: 'Datos de Comunicación' }
  ];

  const deletionReasons = [
    { value: DeletionReason.USER_REQUEST, label: 'Solicitud personal' },
    { value: DeletionReason.CONSENT_WITHDRAWN, label: 'Retirada de consentimiento' },
    { value: DeletionReason.ACCOUNT_CLOSURE, label: 'Cierre de cuenta' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/gdpr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request_data_deletion',
          data: {
            email,
            reason,
            dataCategories: selectedCategories.length > 0 ? selectedCategories : Object.values(DataCategory)
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({
          success: true,
          message: data.message,
          requestId: data.requestId,
          verificationCode: data.verificationCode
        });
        setEmail('');
        setSelectedCategories([]);
      } else {
        setResult({
          success: false,
          message: data.error || 'Error al procesar la solicitud'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Error de conexión. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: DataCategory, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Solicitar Eliminación de Datos</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Importante</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Esta acción es irreversible. Una vez confirmada, eliminaremos permanentemente los datos seleccionados. 
              Algunos datos pueden retenerse por obligaciones legales.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Motivo de la Eliminación
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as DeletionReason)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {deletionReasons.map((reasonOption) => (
              <option key={reasonOption.value} value={reasonOption.value}>
                {reasonOption.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Categorías de Datos a Eliminar (opcional - se eliminarán todas si no seleccionas ninguna)
          </label>
          <div className="space-y-2">
            {dataCategories.map((category) => (
              <div key={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={category.value}
                  checked={selectedCategories.includes(category.value)}
                  onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor={category.value} className="ml-2 text-sm">
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Procesando...' : 'Solicitar Eliminación'}
        </button>
      </form>

      {result && (
        <div className={`mt-4 p-4 rounded-md ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <p>{result.message}</p>
          {result.requestId && (
            <div className="text-sm mt-2 space-y-1">
              <p>ID de solicitud: <code className="bg-green-100 px-1 rounded">{result.requestId}</code></p>
              {result.verificationCode && (
                <p>Código de verificación: <code className="bg-green-100 px-1 rounded">{result.verificationCode}</code></p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function RequestStatusChecker() {
  const [requestId, setRequestId] = useState('');
  const [requestType, setRequestType] = useState<'export' | 'deletion'>('export');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestId) return;

    setLoading(true);
    setStatus(null);

    try {
      const action = requestType === 'export' ? 'export_status' : 'deletion_status';
      const response = await fetch(`/api/gdpr?action=${action}&requestId=${requestId}`);
      const data = await response.json();
      
      if (data.success) {
        setStatus(data);
      } else {
        setStatus({ error: data.error });
      }
    } catch (error) {
      setStatus({ error: 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Verificar Estado de Solicitud</h2>
      
      <form onSubmit={handleCheck} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Tipo de Solicitud
          </label>
          <select
            value={requestType}
            onChange={(e) => setRequestType(e.target.value as 'export' | 'deletion')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="export">Exportación de Datos</option>
            <option value="deletion">Eliminación de Datos</option>
          </select>
        </div>

        <div>
          <label htmlFor="requestId" className="block text-sm font-medium mb-2">
            ID de Solicitud
          </label>
          <input
            type="text"
            id="requestId"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ingresa el ID de tu solicitud"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !requestId}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Verificando...' : 'Verificar Estado'}
        </button>
      </form>

      {status && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          {status.error ? (
            <p className="text-red-600">{status.error}</p>
          ) : (
            <div className="space-y-2">
              <p><strong>Estado:</strong> <span className="capitalize">{status.status}</span></p>
              <p><strong>Fecha de solicitud:</strong> {new Date(status.requestDate).toLocaleDateString('es-CO')}</p>
              {status.completedDate && (
                <p><strong>Fecha de finalización:</strong> {new Date(status.completedDate).toLocaleDateString('es-CO')}</p>
              )}
              {status.downloadUrl && (
                <p><strong>Enlace de descarga:</strong> <a href={status.downloadUrl} className="text-blue-600 hover:underline">Descargar</a></p>
              )}
              {status.expiryDate && (
                <p><strong>Enlace expira:</strong> {new Date(status.expiryDate).toLocaleDateString('es-CO')}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}