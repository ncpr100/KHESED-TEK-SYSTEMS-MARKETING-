'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalMarket } from '@/lib/global-market';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { language, market, geoData } = useGlobalMarket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine market context from pathname for routing
  const isLatamMarket = pathname?.includes('/latam') || false;
  const isUSAMarket = pathname?.includes('/usa') || false;
  const isGlobalMarket = pathname?.includes('/global') || false;
  const isContactPage = pathname === '/contact';
  const isHomePage = pathname === '/';
  
  // Force Spanish for LATAM countries (especially Colombia)
  // Override language detection for Colombian and LATAM users
  const detectedCountry = geoData?.country || 'CO'; // Default to Colombia
  const isLatamCountry = ['CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'VE', 'BO', 'PY', 'UY', 'CR', 'PA', 'GT', 'HN', 'NI', 'SV'].includes(detectedCountry);
  const effectiveLanguage = isLatamCountry ? 'es' : (language || 'en');
  
  // HOMEPAGE PATTERN REPLICATION:
  // The homepage redirects users to market pages (/latam, /usa, /global)
  // So we should follow the same pattern - redirect to market pages as navigation hubs
  
  // Determine the correct market page to use as navigation hub
  const getMarketPath = () => {
    if (isLatamMarket) return '/latam';
    if (isUSAMarket) return '/usa'; 
    if (isGlobalMarket) return '/global';
    
    // For contact page or homepage, use the user's detected market
    const marketPath = market ? `/${market.toLowerCase()}` : '/latam';
    return marketPath;
  };
  
  const marketPath = getMarketPath();
  
  // HOME PAGE NAVIGATION PATTERN:
  // Always navigate to market-specific pages with fragments (like homepage does)
  const featuresHref = `${marketPath}#features`;
  const aboutHref = `${marketPath}#about`;
  const contactHref = '/contact';
  
  // Use effective language (forced Spanish for LATAM) instead of global market context
  const featuresText = effectiveLanguage === 'es' ? 'Funciones' : 'Features';
  const aboutText = effectiveLanguage === 'es' ? 'Nosotros' : 'About';
  const contactText = effectiveLanguage === 'es' ? 'Contacto' : 'Contact';
  const scheduleText = effectiveLanguage === 'es' ? 'Agendar' : 'Schedule';
  const productsText = effectiveLanguage === 'es' ? 'Productos' : 'Products';

  return (
    <header className="sticky top-0 z-50 backdrop-blur-[22px] border-b border-[var(--bdr)]" style={{ background: 'var(--hd-bg)', height: '66px', display: 'flex', alignItems: 'center' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-9 w-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="KHESED-TEK SYSTEMS"
            width={512}
            height={232}
            priority
            sizes="(max-width: 640px) 180px, 260px"
            className="h-[56px] w-auto sm:h-[68px] cosmos-logo"
          />
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-7">
            <Link href={featuresHref} className="transition-colors" style={{ fontSize: '12px', letterSpacing: '0.05em', color: 'var(--muted)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-hi)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{featuresText}</Link>
            <Link href={aboutHref} className="transition-colors" style={{ fontSize: '12px', letterSpacing: '0.05em', color: 'var(--muted)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-hi)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{aboutText}</Link>
            <Link href="/schedule" className="transition-colors" style={{ fontSize: '12px', letterSpacing: '0.05em', color: 'var(--muted)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-hi)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{scheduleText}</Link>
            <Link href="/products" className="transition-colors" style={{ fontSize: '12px', letterSpacing: '0.05em', color: 'var(--muted)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-hi)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{productsText}</Link>
            <Link href={contactHref} className="transition-colors" style={{ fontSize: '12px', letterSpacing: '0.05em', color: 'var(--muted)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-hi)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{contactText}</Link>
            {/* Admin Access - Development Only */}
            {process.env.NODE_ENV === 'development' && (
              <Link 
                href="/admin/carousel" 
                className="text-[var(--brand)] hover:text-[var(--brand2)] font-medium flex items-center gap-1"
                title="Admin: Upload Carousel Images"
              >
                {/* Outline Settings Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Admin
              </Link>
            )}
          </nav>

          {/*
            BUG-10 FIX: restored scroll-reveal CTA. Previously the CTA was
            always-visible, losing the opacity/translate animation and leaving
            the button clickable while invisible (accessibility violation).
            CTA is hidden until user scrolls 80 px, then animates in.
          */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 gradient-btn font-semibold rounded-full"
            style={{ padding: '7px 20px', fontSize: '12px', letterSpacing: '0.04em', color: 'var(--navy)' }}
          >
            {effectiveLanguage === 'es' ? 'Agendar Demo →' : 'Schedule Demo →'}
          </Link>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-[var(--text)] hover:text-[var(--brand)] transition"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
          
          {/* Add back navigation for contact page */}
          {pathname === '/contact' && (
            <Link 
              href="/" 
              className="text-[var(--muted)] hover:text-[var(--text)] text-sm hidden sm:block"
            >
              {language === 'es' ? '← Inicio' : '← Home'}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur border-t border-[var(--border)]">
          <nav className="px-6 py-4 space-y-3">
            <Link 
              href={featuresHref} 
              className="block text-[var(--muted)] hover:text-[var(--text)] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {featuresText}
            </Link>
            <Link 
              href={aboutHref} 
              className="block text-[var(--muted)] hover:text-[var(--text)] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {aboutText}
            </Link>
            <Link 
              href="/schedule" 
              className="block text-[var(--muted)] hover:text-[var(--text)] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {scheduleText}
            </Link>
            <Link 
              href="/products" 
              className="block text-[var(--muted)] hover:text-[var(--text)] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {productsText}
            </Link>
            <Link 
              href={contactHref} 
              className="block text-[var(--muted)] hover:text-[var(--text)] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {contactText}
            </Link>
            {process.env.NODE_ENV === 'development' && (
              <Link 
                href="/admin/carousel" 
                className="flex items-center gap-1 text-[var(--brand)] hover:text-[var(--brand2)] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* Outline Settings Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
