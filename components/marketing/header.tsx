'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalMarket } from '@/lib/global-market';

export default function Header() {
  const pathname = usePathname();
  const { language, market } = useGlobalMarket();
  
  // Determine market context from pathname for routing
  const isLatamMarket = pathname.includes('/latam');
  const isUSAMarket = pathname.includes('/usa');
  const isGlobalMarket = pathname.includes('/global');
  const isContactPage = pathname === '/contact';
  const isHomePage = pathname === '/';
  
  // Get base path for navigation links
  const basePath = isLatamMarket ? '/latam' : isUSAMarket ? '/usa' : isGlobalMarket ? '/global' : '';
  
  // UNIVERSAL TAB NAVIGATION STRATEGY:
  // ALL pages have #features and #about sections, so we can use fragments on current page
  // This enables seamless navigation between tabs without page redirects
  
  const featuresHref = `${pathname}#features`;
  const aboutHref = `${pathname}#about`;
  const contactHref = '/contact';
  
  // Use global market context for language, not path-based
  const featuresText = language === 'es' ? 'Características' : 'Features';
  const aboutText = language === 'es' ? 'Nosotros' : 'About';
  const contactText = language === 'es' ? 'Contacto' : 'Contact';

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
          <nav className="hidden sm:flex gap-6 text-[var(--muted)]">
            <Link href={featuresHref}>{featuresText}</Link>
            <Link href={aboutHref}>{aboutText}</Link>
            <Link href={contactHref}>{contactText}</Link>
          </nav>
          
          {/* Add back navigation for contact page */}
          {pathname === '/contact' && (
            <Link 
              href="/" 
              className="text-[var(--muted)] hover:text-[var(--text)] text-sm sm:hidden"
            >
              {language === 'es' ? '← Inicio' : '← Home'}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
