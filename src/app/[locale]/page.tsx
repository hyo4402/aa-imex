import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HERO_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCr4a8Lkzzma9GAIxlUByTF2-fi5DEBMC2VIuzZMfuirLeBUN3q6akzSLmLZixhUDr8Yn--XCp9VeZr6Q04Qk0ixL2XS2_j6DoDRMRBrHKLkg53H_p4X5s0cQ4trsV1ahmo8N223O1-gGVCTUERXz59sgOxOVPvbXGigqY8h7YkQQ_KQ8NvdMKcIrD5oGAqi4caPutmRh0fNSoMv2ZiplzRe4z-7YvOwMP4Kub6uLYA9cJCBdgtpj1PRP05OKU-E2Qci7NoxrsbfRw';
const WHY_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB4tXR-dPalweQyfD4UpVwtN2EyGUvCYv3iVWMPasLxeJ7e3q6azcQZE37kMHJG1dpvlN-cqNbO51QK2Zx_0JI_q1iFiSkHUf1zbEbDKTjAYZiq0V8BJQqyu7z21ArQWhkk4E_07fmdB7bmftP7BbZUmxwDfL2zxe4x2QJ7kr7yn5M6GzOHnjJBX-q703RSV2TllmyIfW_Mts0eI9NdXcgsl7SbOijzQ0XlFOlCRJ3MmCJvoe3ctQTMdtNv56IA92tbiTQbQjJ65TY';

const CATEGORIES = [
  {
    tag: 'cat1Tag',
    title: 'cat1Title',
    desc: 'cat1Desc',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyDxzL_zVzzmkvGNF-FR0uf_DDB61KrZcGiKXGyGoPEBu1UDFvgjDTaIeoX5JdXa8wObw3Mva5C7Q3GDNmGq1OsYvf-uQo5sURPY2YmKSj-D-j2sOretJjp7uSLgkV29LZRwebivriPOu9CB-Y4sz8p2jvUOpK68eMfN0l8c4-k7uZw5c9cVoF1Vx17JzDtj8AM890TWVt4VUPg2RGnPcVpCoQtZICU7UrpPeoPZvb1OorfSPBI-S_aGVDtGRmw1k5Y5N4ActBQTE',
    slug: 'frozen',
  },
  {
    tag: 'cat2Tag',
    title: 'cat2Title',
    desc: 'cat2Desc',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyUF2V2thL_ZP8Fiqju5uaQU5SElpSZolkgVQ5MLV8LeAJvflEv-F7SjwZ5KRpPHaWbRCdnb99lLbVrHPAixdk3lQctfz2aidwPDEACgMK4VaT8d0u7QadZoU3QHethYWrgDh0O3GS3S0wR3e7TfE0h7UKGYQhkvxa9KoQM85pav3xaBiy6vkKmwuCx3zsgRlMnaF6gdu5zPh8FlcvayjsQsQ2NwGGIcGfu99FYwg8Q4NM4sX3EfaXfsw4K0fUtXylBj9ucBLod08',
    slug: 'agricultural',
  },
  {
    tag: 'cat3Tag',
    title: 'cat3Title',
    desc: 'cat3Desc',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTmPLJ8VZ01bSWrTydZkXgBwsflZJkMLVd1dWiiTsJgeW8-28GvmP0A0p_hydNt3CZe9whsZIwWkiW2JQxK4iEcxF0zXdn-sUKBIx8xg5SJGriOLhvXjo3_PWyTLowX5l0ggRB0rRHycmvwv3zrz62-ucUnPSDFzSL5N5pfkBYYPB4iDZ0UGyFcOPfaMqwhDTL1H1G9tqyUQ5o1Xjo4b5s9c4X698RTN24vFSvK1LaYN3s7TF_3crpKhdqrU4LSKH5Enm7M82PA3w',
    slug: 'seafood',
  },
  {
    tag: 'cat4Tag',
    title: 'cat4Title',
    desc: 'cat4Desc',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNeTgKDpSPlgO6ohvBK-BHlpzVZG_Tkju7_LDhXOlOfQMZTkEMT-VO_r-wCh3p3zct6ImWLGC30haw74R4NQzqZHwnRSuU7jlMF_FLjt8VkhLm8a8bCrErPUaZ1XvyQToYsQZmueI4Na57d7zUek_tnTygQdNqlUcZ6p8I2Xelqz_KcVn6Z5SdEPwpGMfSrKnBnPLMeyVWsZlXNaPT_mdAn8oydYX3bU3y5loEgUJLtHLAuqJ-fOlk51H9TaNo9ZK5q6TLLlHRc-E',
    slug: 'processed',
  },
];

const STRENGTHS = [
  { icon: 'public', titleKey: 's1Title', descKey: 's1Desc', dark: false },
  { icon: 'verified_user', titleKey: 's2Title', descKey: 's2Desc', dark: true },
  { icon: 'local_shipping', titleKey: 's3Title', descKey: 's3Desc', dark: false },
  { icon: 'payments', titleKey: 's4Title', descKey: 's4Desc', dark: false },
];

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'] as const;

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('home');

  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative min-h-[680px] md:min-h-[860px] flex items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image src={HERO_BG} alt="Global logistics" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 py-20">
            <div className="lg:col-span-8">
              <span className="inline-block px-4 py-1.5 mb-6 bg-tertiary-fixed-dim/10 text-tertiary-fixed-dim font-headline font-bold text-xs tracking-widest uppercase rounded-full border border-tertiary-fixed-dim/20">
                {t('heroBadge')}
              </span>
              <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-8xl text-on-primary leading-[1.05] tracking-tight mb-8">
                <span className="metallic-gold-text">{t('heroTitle1')}</span>
                <br />
                <span className="metallic-gold-text">{t('heroTitle2')}</span>
              </h1>
              <p className="text-on-primary-container text-lg md:text-xl max-w-2xl font-light mb-12 leading-relaxed">
                {t('heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href={`/${locale}/products`}
                  className="bg-on-primary text-primary px-10 py-4 rounded-lg font-headline font-bold text-base hover:bg-tertiary-fixed-dim hover:text-on-tertiary-fixed transition-all shadow-lg text-center"
                >
                  {t('heroBtn1')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="border border-on-primary/20 text-on-primary px-10 py-4 rounded-lg font-headline font-bold text-base hover:bg-on-primary/10 transition-all backdrop-blur-sm text-center"
                >
                  {t('heroBtn2')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core Strengths */}
        <section className="py-24 bg-surface px-6 md:px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-20">
              <h2 className="font-headline font-extrabold text-4xl text-primary mb-4">
                <span className="metallic-gold-text">{t('strengthsTitle').split(' ')[0]}</span>{' '}
                {t('strengthsTitle').split(' ').slice(1).join(' ')}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {STRENGTHS.map(({ icon, titleKey, descKey, dark }, i) => (
                <div
                  key={titleKey}
                  className={`p-10 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl group relative overflow-hidden ${
                    dark
                      ? 'bg-primary text-on-primary lg:mt-8'
                      : i === 3
                      ? 'bg-surface-container-low lg:mt-8'
                      : 'bg-surface-container-lowest'
                  }`}
                >
                  {dark && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-on-primary-fixed opacity-50 z-0" />
                  )}
                  <div className={`relative z-10`}>
                    <div className="mb-8">
                      <span
                        className={`material-symbols-outlined text-4xl ${
                          dark ? 'metallic-gold-text' : 'text-secondary'
                        }`}
                      >
                        {icon}
                      </span>
                    </div>
                    <h3
                      className={`font-headline font-bold text-xl mb-4 ${
                        dark ? 'text-on-primary' : 'text-primary'
                      }`}
                    >
                      <span className={dark ? 'metallic-gold-text' : 'group-hover:metallic-gold-text transition-all duration-500'}>
                        {t(titleKey as any)}
                      </span>
                    </h3>
                    <p className={`leading-relaxed ${dark ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      {t(descKey as any)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="font-label text-sm metallic-gold-text font-bold tracking-[0.2em] mb-4 block">
                  {t('catPortfolio')}
                </span>
                <h2 className="font-headline font-extrabold text-5xl text-primary">
                  {t('catTitle').split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="metallic-gold-text">{t('catTitle').split(' ').slice(-1)}</span>
                </h2>
              </div>
              <Link
                href={`/${locale}/products`}
                className="text-primary font-headline font-bold flex items-center gap-2 group"
              >
                {t('catViewAll')}
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 metallic-gold-text">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {CATEGORIES.map(({ tag, title, desc, img, slug }) => (
                <Link
                  key={slug}
                  href={`/${locale}/products?category=${slug}`}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-transparent hover:border-[#e9c176]/30 transition-all"
                >
                  <div className="h-80 relative overflow-hidden">
                    <Image
                      src={img}
                      alt={t(title as any)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-on-primary text-[10px] font-bold tracking-widest px-3 py-1 uppercase">
                        {t(tag as any)}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-headline font-bold text-xl text-primary mb-2 group-hover:metallic-gold-text transition-all">
                      {t(title as any)}
                    </h4>
                    <p className="text-on-surface-variant text-sm mb-6">{t(desc as any)}</p>
                    <span className="metallic-gold-text text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                      Explore{' '}
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden">
            <Image src={WHY_IMG} alt="Logistics center" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-primary/20" />
          </div>
          <div className="bg-primary text-on-primary p-12 md:p-24 flex flex-col justify-center">
            <span className="font-label text-sm metallic-gold-text font-bold tracking-[0.2em] mb-6 block">
              {t('whyBadge')}
            </span>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl mb-8 leading-tight">
              {t('whyTitle').split(' ').slice(0, -1).join(' ')}{' '}
              <span className="metallic-gold-text">{t('whyTitle').split(' ').slice(-1)}</span>
            </h2>
            <p className="text-on-primary-container text-lg mb-12 leading-relaxed font-light">
              {t('whyDesc')}
            </p>
            <div className="space-y-6">
              {[
                { title: t('why1Title'), desc: t('why1Desc') },
                { title: t('why2Title'), desc: t('why2Desc') },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="material-symbols-outlined metallic-gold-text">check_circle</span>
                  <div>
                    <h5 className="font-headline font-bold text-lg">{title}</h5>
                    <p className="text-on-primary-container/70 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6-Step Process */}
        <section className="py-32 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="text-center mb-24">
              <h2 className="font-headline font-extrabold text-4xl text-primary mb-4">
                {t('processTitle').split(' ').slice(0, 1)}{' '}
                <span className="metallic-gold-text">{t('processTitle').split(' ')[1]}</span>{' '}
                {t('processTitle').split(' ').slice(2).join(' ')}
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">{t('processDesc')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {STEPS.map((key, idx) => (
                <div key={key} className="relative group">
                  <div className="mb-6 h-1 w-full bg-surface-container-highest group-hover:bg-gradient-to-r group-hover:from-[#BF953F] group-hover:to-[#AA771C] transition-colors" />
                  <span className="block font-headline font-black text-4xl text-surface-container-highest mb-4 group-hover:metallic-gold-text transition-all">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-headline font-bold text-lg text-primary mb-2">
                    {t(key)}
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    {t(`${key}Desc` as any)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-primary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="bg-surface-container-lowest rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden border border-[#e9c176]/20">
              <div className="flex-1 relative z-10">
                <h2 className="font-headline font-extrabold text-4xl text-primary mb-6">
                  {t('ctaTitle').split(' ').map((word, i) =>
                    word === 'Scale' || word === 'Mở' ? (
                      <span key={i} className="metallic-gold-text">
                        {word}{' '}
                      </span>
                    ) : (
                      word + ' '
                    )
                  )}
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed">{t('ctaDesc')}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-4 w-full md:w-auto relative z-10">
                <Link
                  href={`/${locale}/contact`}
                  className="bg-primary text-on-primary px-12 py-5 rounded-lg font-headline font-bold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-transparent hover:border-[#e9c176]/50 text-center"
                >
                  {t('ctaBtn')}
                </Link>
                <p className="text-center text-on-surface-variant/60 text-sm">{t('ctaNote')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
