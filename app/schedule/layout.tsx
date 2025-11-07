import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agendar Videollamada Personal | KHESED-TEK SYSTEMS',
  description: 'Agenda una videollamada personal con el fundador de KHESED-TEK para conocer cómo nuestra solución puede transformar la gestión de su iglesia.',
  keywords: 'agendar, videollamada, reunión, demo personalizada, KHESED-TEK, gestión iglesias',
  openGraph: {
    title: 'Agendar Videollamada Personal | KHESED-TEK',
    description: 'Hable directamente con el fundador sobre las necesidades específicas de su iglesia',
    type: 'website',
  }
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}