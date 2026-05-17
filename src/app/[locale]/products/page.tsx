import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsClient from '@/components/ProductsClient';
import { getProducts } from '@/lib/sheets';

export const revalidate = 60;

export default async function ProductsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products' });
  const products = await getProducts();
  const initialCategory = searchParams.category || '';

  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-20 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <span className="text-[#b38728] font-bold tracking-widest text-xs mb-4 block uppercase">
              {t('badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-tight font-headline">
              <span className="metallic-gold-text">{t('title1')}</span>
              <br />
              <span className="metallic-gold-text">{t('title2')}</span>
            </h1>
          </div>
          <div className="md:col-span-4 pb-2">
            <p className="text-on-surface-variant text-lg leading-relaxed font-body">{t('desc')}</p>
          </div>
        </section>

        {/* Product Explorer */}
        <ProductsClient
          products={products}
          locale={locale}
          initialCategory={initialCategory}
        />

        {/* Capability Bento */}
        <section className="mt-40 bg-surface-container-low py-24">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold text-primary mb-2 font-headline">
                <span className="metallic-gold-text">Supply Capability & Logistics</span>
              </h2>
              <p className="text-on-surface-variant">Streamlined distribution frameworks for global trade partners.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 bg-surface-container-lowest p-10 flex flex-col justify-between h-[320px] border-t-4 gold-border-accent">
                <div>
                  <span className="material-symbols-outlined text-[#b38728] text-4xl mb-6">inventory_2</span>
                  <h3 className="text-2xl font-bold text-primary mb-4 font-headline">Packaging Flexibility</h3>
                  <p className="text-on-surface-variant font-body">
                    From retail-ready private labeling to 1000kg industrial totes, we adapt to your specific storage and handling needs.
                  </p>
                </div>
              </div>
              <div className="md:col-span-1 bg-primary text-on-primary p-10 flex flex-col justify-between h-[320px]">
                <div>
                  <span className="material-symbols-outlined text-[#fcf6ba] text-4xl mb-6">public</span>
                  <h3 className="text-xl font-bold mb-4 font-headline">Global Reach</h3>
                  <p className="text-on-primary-container text-sm leading-relaxed">
                    Direct shipping lanes to 45+ countries across Europe, Asia, and North America.
                  </p>
                </div>
              </div>
              <div className="md:col-span-1 bg-surface-container-highest p-10 flex flex-col justify-between h-[320px]">
                <div>
                  <span className="material-symbols-outlined text-primary text-4xl mb-6">monitoring</span>
                  <h3 className="text-xl font-bold text-primary mb-4 font-headline">Trackable Chain</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Real-time GPS and temperature monitoring for all high-value perishable exports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
