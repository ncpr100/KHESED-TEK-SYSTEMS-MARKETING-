export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] text-center text-[var(--muted)] py-6 mt-10 px-4">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4 mb-4">
        <div className="card p-4">
          <div className="text-xs uppercase tracking-wide text-[#b9bec7]">Correo</div>
          <a href="mailto:contacto@khesed-tek-systems.org" className="text-[var(--text)] hover:underline">
            contacto@khesed-tek-systems.org
          </a>
        </div>
        <div className="card p-4">
          <div className="text-xs uppercase tracking-wide text-[#b9bec7]">WhatsApp</div>
          <a href="https://wa.me/573021234410" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline">
            +57 302 123 4410
          </a>
        </div>
        <div className="card p-4">
          <div className="text-xs uppercase tracking-wide text-[#b9bec7]">Ubicación</div>
          <div className="text-[var(--text)]">Barranquilla, Atlántico, Colombia</div>
        </div>
      </div>
      <div>© 2025 KHESED-TEK. Todos los derechos reservados.</div>
    </footer>
  );
}
