'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
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
        <nav className="hidden sm:flex gap-6 text-[var(--muted)]">
          <Link href="/#features">Features</Link>
          <Link href="/#about">Nosotros</Link>
          <Link href="/contact">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
