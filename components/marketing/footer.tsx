'use client';
import { analytics } from '@/lib/analytics';
import OutlineIcon from '@/components/ui/outline-icon';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--bdr-gold)] text-center text-[var(--muted)] py-6 mt-10 px-4 bg-[var(--navy-2)]/40">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-4 gap-4 mb-4">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            <OutlineIcon name="mail" className="w-4 h-4 text-[var(--gold-hi)]" />
            <div className="text-xs uppercase tracking-wide text-[#b9bec7]">Correo</div>
          </div>
          <a
            href="mailto:contacto@khesed-tek-systems.org"
            className="text-[var(--text)] hover:underline"
            onClick={() => analytics.ctaClicked('email', 'footer')}
          >
            contacto@khesed-tek-systems.org
          </a>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            <OutlineIcon name="phone" className="w-4 h-4 text-[var(--gold-hi)]" />
            <div className="text-xs uppercase tracking-wide text-[#b9bec7]">WhatsApp</div>
          </div>
          <a href="https://wa.me/573021234410" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline" onClick={() => analytics.whatsappClick('footer')}>
            +57 302 123 4410
          </a>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            {/* BUG-09 FIX: was accidentally "marker", restored to "map-pin" */}
            <OutlineIcon name="map-pin" className="w-4 h-4 text-[var(--gold-hi)]" />
            <div className="text-xs uppercase tracking-wide text-[#b9bec7]">Ubicación</div>
          </div>
          <div className="text-[var(--text)]">Barranquilla, Atlántico, Colombia</div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs uppercase tracking-wide text-[#b9bec7]">Síguenos</div>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/nc.khesed.tek.systems"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              onClick={() => analytics.ctaClicked("facebook", "footer")}
              className="text-[var(--muted)] hover:text-[var(--gold-hi)] transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/@khesed.tek.systems.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={() => analytics.ctaClicked("instagram", "footer")}
              className="text-[var(--muted)] hover:text-[var(--gold-hi)] transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@Khesed-Tek-Systems"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              onClick={() => analytics.ctaClicked("youtube", "footer")}
              className="text-[var(--muted)] hover:text-[var(--gold-hi)] transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@knesed.tek.systems/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              onClick={() => analytics.ctaClicked("tiktok", "footer")}
              className="text-[var(--muted)] hover:text-[var(--gold-hi)] transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
        <div>© {new Date().getFullYear()} KHESED-TEK SYSTEMS. Todos los derechos reservados.</div>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-[var(--brand)] transition">Política de Privacidad</a>
          <span className="text-[var(--border)]">|</span>
          <a href="/terms" className="hover:text-[var(--brand)] transition">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
}
