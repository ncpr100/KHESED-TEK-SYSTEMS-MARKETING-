// app/usa/layout.tsx
//
// BUG-05 FIX: /usa serves English content but inherits lang="es" from the root
// layout. This server layout exports correct locale metadata and applies lang="en"
// via an inline script (safest workaround without a separate root layout).

export const metadata = {
  alternates: {
    canonical: 'https://www.khesed-tek-systems.org/usa',
  },
  openGraph: {
    locale: 'en_US',
  },
};

export default function UsaLayout({ children }: { children: React.ReactNode }) {
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
