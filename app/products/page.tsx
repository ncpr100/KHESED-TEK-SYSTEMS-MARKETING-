import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import ProductRequestForm from '@/components/products/product-request-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productos Digitales - E-books y Recursos | KHESED-TEK',
  description: 'Adquiere nuestros E-books espirituales: Paz en la Tormenta, Floreciendo en el Fuego, y Vida de Impacto. Recursos digitales para tu crecimiento espiritual.',
  keywords: 'e-books cristianos, recursos espirituales, libros digitales, crecimiento espiritual, KHESED-TEK',
  openGraph: {
    title: 'Productos Digitales - KHESED-TEK',
    description: 'E-books y recursos espirituales para iglesias y líderes cristianos',
    type: 'website',
  },
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0e0e10] pt-24 pb-16">
        <ProductRequestForm />
      </main>
      <Footer />
    </>
  );
}
