'use client';

import React, { useState, useEffect } from 'react';
import { consentManager } from '@/lib/gdpr/consent';
import { CookieConsentPreferences, CookieBannerConfig } from '@/lib/gdpr/types';

interface CookieConsentBannerProps {
  config?: Partial<CookieBannerConfig>;
  onConsentChange?: (preferences: CookieConsentPreferences) => void;
}

export default function CookieConsentBanner({ config, onConsentChange }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: Date.now(),
    version: '1.0.0'
  });

  const bannerConfig: CookieBannerConfig = {
    ...consentManager.getDefaultBannerConfig(),
    ...config
  };

  useEffect(() => {
    // Check if consent has already been given
    const existingConsent = consentManager.getCookieConsent();
    const isConsentRequired = consentManager.isConsentRequired('');

    if (!existingConsent || isConsentRequired) {
      setIsVisible(true);
    }

    if (existingConsent) {
      setPreferences(existingConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences: CookieConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: Date.now(),
      version: bannerConfig.title // Use config as version placeholder
    };

    saveConsent(newPreferences);
  };

  const handleRejectAll = () => {
    const newPreferences: CookieConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: Date.now(),
      version: bannerConfig.title
    };

    saveConsent(newPreferences);
  };

  const handleSaveCustom = () => {
    const newPreferences: CookieConsentPreferences = {
      ...preferences,
      timestamp: Date.now(),
      version: bannerConfig.title
    };

    saveConsent(newPreferences);
  };

  const saveConsent = async (newPreferences: CookieConsentPreferences) => {
    try {
      // Save to local storage immediately
      consentManager.setCookieConsent(
        '', // We'll generate the subject ID on the server
        newPreferences,
        undefined, // IP will be determined server-side
        navigator.userAgent
      );

      // Send to server for audit logging
      await fetch('/api/gdpr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_cookie_consent',
          data: {
            email: 'anonymous', // For cookie consent, we don't have email yet
            preferences: newPreferences,
            userAgent: navigator.userAgent
          }
        })
      });

      setIsVisible(false);
      onConsentChange?.(newPreferences);

      // Trigger analytics if consent given
      if (newPreferences.analytics) {
        // Initialize Google Analytics
        window.gtag?.('consent', 'update', {
          analytics_storage: 'granted'
        });
      }

      if (newPreferences.marketing) {
        // Initialize marketing tools
        window.gtag?.('consent', 'update', {
          ad_storage: 'granted'
        });
      }

    } catch (error) {
      console.error('Failed to save consent preferences:', error);
    }
  };

  const handlePreferenceChange = (key: keyof CookieConsentPreferences, value: boolean) => {
    if (key === 'necessary') return; // Can't change necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 ${bannerConfig.position === 'center' ? 'flex items-center justify-center' : ''}`}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      
      {/* Banner */}
      <div className={`
        relative bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700
        ${bannerConfig.position === 'top' ? 'top-0' : bannerConfig.position === 'center' ? 'rounded-lg max-w-2xl mx-4' : 'bottom-0'}
        ${bannerConfig.position === 'center' ? 'w-full' : 'left-0 right-0'}
      `}>
        <div className="px-6 py-4">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {bannerConfig.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {bannerConfig.description}
            </p>
            <a 
              href={bannerConfig.policyUrl}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {bannerConfig.policyLinkText}
            </a>
          </div>

          {/* Cookie Categories (if showing details) */}
          {showDetails && (
            <div className="mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Cookies Necesarias
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Requeridas para el funcionamiento básico del sitio web
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Analytics
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Nos ayudan a entender cómo interactúas con nuestro sitio web
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Marketing
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Utilizadas para mostrarte contenido relevante y personalizado
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Funcionales
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mejoran la funcionalidad y personalización del sitio web
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!showDetails ? (
              <>
                <button
                  onClick={handleAcceptAll}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {bannerConfig.acceptAllText}
                </button>
                
                {bannerConfig.showRejectButton && (
                  <button
                    onClick={handleRejectAll}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {bannerConfig.rejectAllText}
                  </button>
                )}
                
                {bannerConfig.showCustomizeButton && (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {bannerConfig.customizeText}
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveCustom}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Guardar Preferencias
                </button>
                
                <button
                  onClick={() => setShowDetails(false)}
                  className="border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Volver
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Cookie settings component for user preferences page
export function CookieSettingsPanel() {
  const [preferences, setPreferences] = useState<CookieConsentPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const consent = consentManager.getCookieConsent();
    setPreferences(consent);
    setLoading(false);
  }, []);

  const handleUpdatePreferences = async (newPreferences: CookieConsentPreferences) => {
    try {
      consentManager.setCookieConsent('', newPreferences, undefined, navigator.userAgent);
      setPreferences(newPreferences);
      
      // Update analytics consent
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: newPreferences.analytics ? 'granted' : 'denied',
          ad_storage: newPreferences.marketing ? 'granted' : 'denied'
        });
      }
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded"></div>;
  }

  if (!preferences) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No se encontraron preferencias de cookies.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Configuración de Cookies</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Cookies Necesarias</h4>
            <p className="text-sm text-gray-500">Siempre activas - requeridas para el funcionamiento del sitio</p>
          </div>
          <input type="checkbox" checked disabled className="h-4 w-4" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Analytics</h4>
            <p className="text-sm text-gray-500">Nos ayudan a mejorar nuestro sitio web</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={(e) => handleUpdatePreferences({ ...preferences, analytics: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Marketing</h4>
            <p className="text-sm text-gray-500">Para contenido personalizado y relevante</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.marketing}
            onChange={(e) => handleUpdatePreferences({ ...preferences, marketing: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Funcionales</h4>
            <p className="text-sm text-gray-500">Mejoran la experiencia del usuario</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.functional}
            onChange={(e) => handleUpdatePreferences({ ...preferences, functional: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Última actualización: {new Date(preferences.timestamp).toLocaleDateString('es-CO')}</p>
        <p>Versión de política: {preferences.version}</p>
      </div>
    </div>
  );
}