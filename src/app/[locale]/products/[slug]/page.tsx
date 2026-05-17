import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProduct, getProducts } from '@/lib/sheets';

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export default async function ProductDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'productDetail' });
  const product = await getProduct(slug);

  if (!product) notFound();

  const name = locale === 'vn' ? product.name_vn || product.name_en : product.name_en;
  const descLong = locale === 'vn' ? product.desc_long_vn || product.desc_long_en : product.desc_long_en;
  const category = locale === 'vn' ? product.category_vn || product.category_en : product.category_en;

  // Related products (other products from same category)
  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.slug !== slug && (locale === 'vn' ? p.category_vn : p.category_en) === category)
    .slice(0, 4);

  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-8">
          <Link
            href={`/${locale}/products`}
            className="text-secondary font-body text-sm hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {t('backToProducts')}
          </Link>
        </div>

        {/* Hero */}
        <section className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Image */}
            <div className="lg:col-span-7 bg-surface-container-low p-4 rounded-xl">
              {product.image_url ? (
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={product.image_url}
                    alt={name}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] flex items-center justify-center bg-surface-container rounded-lg">
                  <span className="material-symbols-outlined text-8xl text-outline-variant">image</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {category && (
                <span className="text-tertiary-fixed-dim font-headline font-bold tracking-widest text-xs uppercase mb-4">
                  {category}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-primary leading-[1.1] mb-6">
                {name}
              </h1>
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                {product.sku && (
                  <span className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-semibold text-on-surface-variant">
                    SKU: {product.sku}
                  </span>
                )}
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-sm material-symbols-filled">star</span>
                  <span className="text-xs font-bold uppercase tracking-tight">Grade A Certified</span>
                </div>
              </div>
              {descLong && (
                <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-md">{descLong}</p>
              )}
              <div className="space-y-4">
                <Link
                  href={`/${locale}/contact?product=${encodeURIComponent(name)}`}
                  className="w-full bg-primary text-on-primary py-5 rounded-lg font-headline font-bold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                >
                  {t('requestQuote')}
                  <span className="material-symbols-outlined">trending_flat</span>
                </Link>
                <p className="text-center text-xs text-on-surface-variant/60 font-medium">{t('responseTime')}</p>
              </div>

              {/* Stats */}
              {(product.capacity || product.origin) && (
                <div className="mt-12 grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8">
                  {product.capacity && (
                    <div>
                      <span className="text-primary font-headline font-black text-2xl">{product.capacity}</span>
                      <p className="text-on-surface-variant text-xs font-medium uppercase mt-1">{t('capacityLabel')}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-primary font-headline font-black text-2xl">{t('availability')}</span>
                    <p className="text-on-surface-variant text-xs font-medium uppercase mt-1">{t('availabilityLabel')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        {(product.specs.length > 0 || product.origin) && (
          <section className="bg-surface-container-low py-24">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Specifications */}
                <div>
                  <h2 className="text-3xl font-headline font-bold text-primary mb-12 flex items-center gap-4">
                    <span className="w-8 h-[2px] bg-tertiary-fixed-dim" />
                    {t('specsTitle')}
                  </h2>
                  <div className="space-y-0">
                    {/* Always show origin and packaging from product */}
                    {product.origin && (
                      <div className="grid grid-cols-2 py-5 border-b border-outline-variant/10">
                        <span className="text-on-surface-variant font-medium">
                          {locale === 'vn' ? 'Xuất Xứ' : 'Origin'}
                        </span>
                        <span className="text-primary font-bold">{product.origin}</span>
                      </div>
                    )}
                    {product.packaging && (
                      <div className="grid grid-cols-2 py-5 border-b border-outline-variant/10">
                        <span className="text-on-surface-variant font-medium">
                          {locale === 'vn' ? 'Đóng Gói' : 'Packaging'}
                        </span>
                        <span className="text-primary font-bold">{product.packaging}</span>
                      </div>
                    )}
                    {product.specs.map(({ label, value }) => (
                      <div key={label} className="grid grid-cols-2 py-5 border-b border-outline-variant/10">
                        <span className="text-on-surface-variant font-medium">{label}</span>
                        <span className="text-primary font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality & Compliance */}
                <div className="bg-surface-container-lowest p-12 rounded-xl shadow-sm">
                  <h2 className="metallic-gold-text text-3xl font-headline font-extrabold mb-8">{t('qualityTitle')}</h2>
                  <p className="text-on-surface-variant mb-12">{t('qualityDesc')}</p>
                  <div className="grid grid-cols-3 gap-8">
                    {[
                      { icon: 'verified', label: 'ISO 22000' },
                      { icon: 'safety_check', label: 'HACCP' },
                      { icon: 'shield', label: 'BRC FOOD' },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex flex-col items-center group">
                        <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary-container transition-colors">
                          <span className="material-symbols-outlined text-secondary material-symbols-filled">{icon}</span>
                        </div>
                        <span className="text-xs font-bold text-primary">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className="bg-surface-container-low py-24">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
              <h2 className="text-3xl font-headline font-bold text-primary mb-12">{t('relatedTitle')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((rel) => {
                  const relName = locale === 'vn' ? rel.name_vn || rel.name_en : rel.name_en;
                  const relCat = locale === 'vn' ? rel.category_vn || rel.category_en : rel.category_en;
                  return (
                    <Link
                      key={rel.slug}
                      href={`/${locale}/products/${rel.slug}`}
                      className="bg-surface-container-lowest rounded-xl overflow-hidden group"
                    >
                      <div className="aspect-square overflow-hidden relative">
                        {rel.image_url ? (
                          <Image
                            src={rel.image_url}
                            alt={relName}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-surface-container">
                            <span className="material-symbols-outlined text-5xl text-outline-variant">image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        {relCat && (
                          <span className="text-[10px] font-bold text-tertiary-fixed-dim uppercase tracking-widest mb-2 block">
                            {relCat}
                          </span>
                        )}
                        <h4 className="text-primary font-bold font-headline mb-4">{relName}</h4>
                        <span className="text-sm font-semibold text-secondary flex items-center gap-2 group/link">
                          {t('viewDetails')}
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
