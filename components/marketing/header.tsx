'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalMarket } from '@/lib/global-market';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { language, market } = useGlobalMarket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine market context from pathname for routing
  const isLatamMarket = pathname?.includes('/latam') || false;
  const isUSAMarket = pathname?.includes('/usa') || false;
  const isGlobalMarket = pathname?.includes('/global') || false;
  const isContactPage = pathname === '/contact';
  const isHomePage = pathname === '/';
  
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
  
  // Use global market context for language, not path-based
  const featuresText = language === 'es' ? 'Características' : 'Features';
  const aboutText = language === 'es' ? 'Nosotros' : 'About';
  const contactText = language === 'es' ? 'Contacto' : 'Contact';
  const scheduleText = language === 'es' ? 'Agendar' : 'Schedule';

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="KHESED-TEK SYSTEMS"
            width={36}
            height={36}
            priority
          />
          <span className="font-semibold">KHESED-TEK SYSTEMS</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-6 text-[var(--muted)]">
            <Link href={featuresHref} className="hover:text-[var(--text)] transition">{featuresText}</Link>
            <Link href={aboutHref} className="hover:text-[var(--text)] transition">{aboutText}</Link>
            <Link href="/schedule" className="hover:text-[var(--text)] transition">{scheduleText}</Link>
            <Link href={contactHref} className="hover:text-[var(--text)] transition">{contactText}</Link>
            {/* Admin Access - Development Only */}
            {process.env.NODE_ENV === 'development' && (
              <Link 
                href="/admin/carousel" 
                className="text-[var(--brand)] hover:text-[var(--brand2)] font-medium"
                title="Admin: Upload Carousel Images"
              >
                🔧 Admin
              </Link>
            )}
          </nav>

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
              href={contactHref} 
              className="block text-[var(--muted)] hover:text-[var(--text)] transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {contactText}
            </Link>
            {process.env.NODE_ENV === 'development' && (
              <Link 
                href="/admin/carousel" 
                className="block text-[var(--brand)] hover:text-[var(--brand2)] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🔧 Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
