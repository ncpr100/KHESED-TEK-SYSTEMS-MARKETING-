import { useState } from 'react';
import Image from 'next/image';

interface LoginSignupProps {
  mode?: 'login' | 'signup';
  onClose?: () => void;
}

export default function LoginSignup({ mode = 'login', onClose }: LoginSignupProps) {
  const [currentMode, setCurrentMode] = useState<'login' | 'signup'>(mode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    churchName: '',
    fullName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/khesed-tek-logo.png"
            alt="KHESED-TEK"
            width={120}
            height={60}
            className="mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-[var(--text)]">
            {currentMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {currentMode === 'login' 
              ? 'Accede a tu sistema de gestión pastoral'
              : 'Únete a la plataforma de gestión pastoral líder'
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {currentMode === 'signup' && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[var(--text)]">
                    Nombre Completo
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[var(--border)] placeholder-[var(--text-muted)] text-[var(--text)] bg-[var(--surface)] rounded-md focus:outline-none focus:ring-[var(--brand)] focus:border-[var(--brand)] focus:z-10 sm:text-sm"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="churchName" className="block text-sm font-medium text-[var(--text)]">
                    Nombre de la Iglesia
                  </label>
                  <input
                    id="churchName"
                    name="churchName"
                    type="text"
                    required
                    value={formData.churchName}
                    onChange={handleInputChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[var(--border)] placeholder-[var(--text-muted)] text-[var(--text)] bg-[var(--surface)] rounded-md focus:outline-none focus:ring-[var(--brand)] focus:border-[var(--brand)] focus:z-10 sm:text-sm"
                    placeholder="Nombre de tu iglesia"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text)]">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[var(--border)] placeholder-[var(--text-muted)] text-[var(--text)] bg-[var(--surface)] rounded-md focus:outline-none focus:ring-[var(--brand)] focus:border-[var(--brand)] focus:z-10 sm:text-sm"
                placeholder="tu@iglesia.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text)]">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[var(--border)] placeholder-[var(--text-muted)] text-[var(--text)] bg-[var(--surface)] rounded-md focus:outline-none focus:ring-[var(--brand)] focus:border-[var(--brand)] focus:z-10 sm:text-sm"
                placeholder="Tu contraseña"
              />
            </div>

            {currentMode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--text)]">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[var(--border)] placeholder-[var(--text-muted)] text-[var(--text)] bg-[var(--surface)] rounded-md focus:outline-none focus:ring-[var(--brand)] focus:border-[var(--brand)] focus:z-10 sm:text-sm"
                  placeholder="Confirma tu contraseña"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] hover:from-[var(--brand2)] hover:to-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand)] transition-all duration-200"
            >
              {currentMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCurrentMode(currentMode === 'login' ? 'signup' : 'login')}
              className="text-[var(--brand)] hover:text-[var(--brand2)] transition-colors duration-200"
            >
              {currentMode === 'login' 
                ? '¿No tienes cuenta? Regístrate aquí'
                : '¿Ya tienes cuenta? Inicia sesión aquí'
              }
            </button>
          </div>

          {currentMode === 'login' && (
            <div className="text-center">
              <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors duration-200">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--bg)] text-[var(--text-muted)]">O continúa con</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-[var(--border)] rounded-md shadow-sm bg-[var(--surface)] text-sm font-medium text-[var(--text)] hover:bg-[var(--border)] transition-colors duration-200">
              <span>Google</span>
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-[var(--border)] rounded-md shadow-sm bg-[var(--surface)] text-sm font-medium text-[var(--text)] hover:bg-[var(--border)] transition-colors duration-200">
              <span>Microsoft</span>
            </button>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}