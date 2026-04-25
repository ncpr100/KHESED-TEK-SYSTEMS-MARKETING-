// app/global/layout.tsx
//
// BUG-05 FIX: /global serves English content but inherits lang="es" from the
// root layout. Same pattern as app/usa/layout.tsx.

export const metadata = {
  alternates: {
    canonical: 'https://www.khesed-tek-systems.org/global',
  },
  openGraph: {
    locale: 'en_US',
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = 'en';`,
        }}
      />
      {children}
    </>
  );
}
