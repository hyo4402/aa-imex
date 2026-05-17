import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { product?: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <header className="max-w-screen-2xl mx-auto px-6 md:px-8 mb-20">
          <div className="max-w-3xl">
            <span className="metallic-gold-text font-headline font-bold tracking-widest text-xs uppercase mb-4 block">
              {t('badge')}
            </span>
            <h1 className="text-primary font-headline font-extrabold text-5xl md:text-7xl tracking-tighter leading-none mb-6">
              {t('title1')}
              <br />
              <span className="metallic-gold-text">{t('title2')}</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">{t('desc')}</p>
          </div>
        </header>

        {/* Contact Grid */}
        <section className="max-w-screen-2xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest editorial-shadow p-8 md:p-14 border-t-4 border-[#8a642a]">
            <div className="mb-10">
              <h2 className="font-headline font-bold text-3xl text-primary mb-2">{t('formTitle')}</h2>
              <p className="text-on-surface-variant text-sm italic">{t('formNote')}</p>
            </div>
            <ContactForm locale={locale} defaultProduct={searchParams.product} />
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-surface-container-low p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <span className="material-symbols-outlined text-8xl">corporate_fare</span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-primary mb-8 border-b border-outline-variant/20 pb-4">
                {t('hqTitle')}
              </h3>
              <div className="space-y-8">
                {[
                  { icon: 'location_on', label: t('addressLabel'), text: t('address') },
                  { icon: 'call', label: t('phoneLabel'), text: '+84 (0) 000 000 000' },
                  { icon: 'mail', label: t('emailLabel'), text: 'trade@aa-imex.com' },
                  { icon: 'schedule', label: t('hoursLabel'), text: t('hours') },
                ].map(({ icon, label, text }) => (
                  <div key={label} className="flex gap-6">
                    <span className="material-symbols-outlined text-secondary material-symbols-filled flex-shrink-0">
                      {icon}
                    </span>
                    <div>
                      <p className="font-headline font-bold text-sm uppercase tracking-tighter text-on-surface-variant mb-1">
                        {label}
                      </p>
                      <p className="text-on-surface leading-relaxed whitespace-pre-line">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* International Trade Network */}
        <section className="max-w-screen-2xl mx-auto px-6 md:px-8 mt-32">
          <h2 className="font-headline font-extrabold text-4xl text-primary mb-12">
            {t('networkTitle').split(' ').slice(0, -2).join(' ')}{' '}
            <span className="metallic-gold-text">
              {t('networkTitle').split(' ').slice(-2).join(' ')}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('region1Title'), desc: t('region1Desc') },
              { title: t('region2Title'), desc: t('region2Desc') },
              { title: t('region3Title'), desc: t('region3Desc') },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="p-8 bg-surface-container-lowest border-l-4 border-[#8a642a] editorial-shadow"
              >
                <h4 className="font-headline font-bold text-xl text-primary mb-4">{title}</h4>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{desc}</p>
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 metallic-gold-text font-headline font-bold text-xs uppercase hover:underline"
                >
                  {locale === 'vn' ? 'Liên Hệ Khu Vực' : 'Regional Contact'}{' '}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
