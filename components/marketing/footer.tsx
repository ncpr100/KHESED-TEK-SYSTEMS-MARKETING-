'use client';
import { analytics } from '@/lib/analytics';
import OutlineIcon from '@/components/ui/outline-icon';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] text-center text-[var(--muted)] py-6 mt-10 px-4">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-4 gap-4 mb-4">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            <OutlineIcon name="mail" className="w-4 h-4 text-cyan-400" />
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
            <OutlineIcon name="phone" className="w-4 h-4 text-cyan-400" />
            <div className="text-xs uppercase tracking-wide text-[#b9bec7]">WhatsApp</div>
          </div>
          <a href="https://wa.me/573021234410" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline" onClick={() => analytics.whatsappClick('footer')}>
            +57 302 123 4410
          </a>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-1">
            {/* BUG-09 FIX: was accidentally "marker", restored to "map-pin" */}
            <OutlineIcon name="map-pin" className="w-4 h-4 text-cyan-400" />
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
              href="https://linkedin.com/company/khesed-tek-systems"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => analytics.ctaClicked("linkedin", "footer")}
              className="text-[var(--muted)] hover:text-[var(--brand)] transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/watch?v=d4rKaIUTCQQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              onClick={() => analytics.ctaClicked("youtube", "footer")}
              className="text-[var(--muted)] hover:text-[var(--brand)] transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
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
