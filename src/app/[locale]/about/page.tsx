import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA1rKlNdrANV3PU5NaVtakTap0AmR_q0pCW935Lga63sKxpCksoR821DTmrR594th_JKn97NCLj1QPNwdVrrSkPSobLRlE2NVWTS8kRB39-jU9qSk4H71q1hFMjmk9KPgMTrmn02NaklhhPIGCqDrqcrfEG2anCT_19HbJo_naQPTqSkPm2YtuujD3dfH5KdoiHv10r-3Jb5rt1IHrPtpE7xiA26wlfQVFoluSh-lZVUL6nO2Gfa2rwF_hqIrtrPtdaBXaDPZAxHYg';
const STORY_IMG1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDG94_UjQ7yoP857c0rlUfigqVgEAogPQF9g2pT0R-AaUflRRQfFhuHp9Ay3oLyQhKvbQc9S29SoELYvJ3XL-inKd6zLAFzd219WjWENW1c-QV8gIaZKSzdz5dDmbfXc_iJ4xi9x_rw-KHEVESJQgMjFO16oLWjADIqVjnI0BSK3-Pca6VJMgf59dLjcDG1x-RJWEqQekTWZ2puH9xAUJx944ObBlLswNOXEm1--qlMas8nN2VyIX57omUKtRSd9e3rtJ6rfdmk_mM';
const STORY_IMG2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDCJauzjWO7kcS8TpLr6xRIlA5CWLdPiIyXUrDCy8N1pfmdi9nEQZAaAiL_TT1Oo4pewSmJvODakecIZ88tjdGgUHoepKsJ1f7G6qDOXjriVXwcnwBTBZXYZc_h93uaQx0C9CV34XtiwDTUsRLnnOxLYmwa4Pv7_dFMd7686DejiKU9S0lz3mPQAHaAGLOp_R5WXLx5D1CIfpxZhzmPrHYMEmFPeBGYqYdeFnaqRxdQYbP-br9ZoHWb9potGmA0cylciYwFUZV6g';
const QUALITY_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYaQdZyNrnJDEZZdtK-DJ35nn43rccllcsGrKbIQOWSSm8027z_VaX-CfyHKvXCpWnS7jnXZm8GBJo5iGwShPFqx12MLdLMSULTebFpT91z8pn6CtR7OoM67BKgPpPHuTIZuAda6yA2glklqTBfK_QJHJNsQHsBAzQ1v6HjVc9xubTMwzSxDMRoayWyGuu3LipiM4TScOQsr4hHk6H78wfeBxK4UTK90muXENbyplyU3uOcEXgGMa6ID2NJvSLqO1nbTDSMRiypHE';

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[600px] md:h-[716px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src={HERO_IMG} alt="About AA-IMEX" fill className="object-cover grayscale-[0.2]" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-8 w-full">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1 bg-tertiary-fixed-dim text-on-tertiary-fixed text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
                {t('heroBadge')}
              </span>
              <h1 className="text-on-primary font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-8">
                {t('heroTitle').split('Global Pantry.')[0]}
                <span className="metallic-gold-text">
                  {t('heroTitle').includes('Global Pantry') ? 'Global Pantry.' : t('heroTitle')}
                </span>
              </h1>
              <p className="text-on-primary-container font-body text-xl leading-relaxed max-w-xl">
                {t('heroDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface-container-low py-16">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: t('stat1'), label: t('stat1Label') },
                { val: t('stat2'), label: t('stat2Label') },
                { val: t('stat3'), label: t('stat3Label') },
                { val: t('stat4'), label: t('stat4Label') },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col border-l border-outline-variant/30 pl-6">
                  <span className="metallic-gold-text font-headline text-4xl font-black mb-1">{val}</span>
                  <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5">
              <h2 className="text-primary font-headline text-4xl font-bold tracking-tighter mb-8 leading-none">
                {t('storyTitle').split('Curated')[0]}
                <span className="metallic-gold-text">
                  {t('storyTitle').includes('Curated') ? 'Curated Trade.' : ''}
                </span>
              </h2>
              <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
                <p>{t('storyP1')}</p>
                <p>{t('storyP2')}</p>
              </div>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="pt-12">
                <div className="relative h-64 md:h-96">
                  <Image src={STORY_IMG1} alt="Fresh produce" fill className="object-cover rounded-sm" unoptimized />
                </div>
              </div>
              <div>
                <div className="relative h-64 md:h-96">
                  <Image src={STORY_IMG2} alt="Warehouse" fill className="object-cover rounded-sm" unoptimized />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mission */}
              <div className="md:col-span-2 bg-primary p-12 flex flex-col justify-between min-h-[400px]">
                <div>
                  <span className="metallic-gold-text font-label text-xs uppercase tracking-[0.3em]">{t('missionLabel')}</span>
                  <h3 className="text-on-primary font-headline text-3xl md:text-4xl font-bold mt-4 leading-tight">
                    {t('missionTitle').split('sustainable')[0]}
                    <span className="metallic-gold-text">sustainable</span>
                    {t('missionTitle').split('sustainable')[1]}
                  </h3>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <div className="h-[1px] w-24 bg-tertiary-fixed-dim/40" />
                  <span className="text-on-primary-container text-sm">{t('missionNote')}</span>
                </div>
              </div>

              {/* Vision */}
              <div className="bg-surface-container-lowest p-12 border-b-4 border-secondary editorial-shadow">
                <span className="text-secondary font-label text-xs uppercase tracking-[0.3em]">{t('visionLabel')}</span>
                <h3 className="text-primary font-headline text-2xl font-bold mt-4 mb-6">
                  {t('visionTitle').split('ethical')[0]}
                  <span className="metallic-gold-text">ethical luxury</span>
                  {t('visionTitle').split('ethical luxury')[1]}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{t('visionDesc')}</p>
              </div>

              {/* Values */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[
                  { icon: 'verified', title: t('v1Title'), desc: t('v1Desc') },
                  { icon: 'hub', title: t('v2Title'), desc: t('v2Desc') },
                  { icon: 'eco', title: t('v3Title'), desc: t('v3Desc') },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="bg-surface-container-lowest p-8 editorial-shadow border-t border-outline-variant/10">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim mb-4">{icon}</span>
                    <h4 className="text-primary font-headline font-bold text-lg mb-2">{title}</h4>
                    <p className="text-on-surface-variant text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Network */}
        <section id="network" className="py-24 bg-primary overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="mb-16">
              <span className="metallic-gold-text font-label text-xs uppercase tracking-[0.3em]">{t('networkBadge')}</span>
              <h2 className="text-on-primary font-headline text-4xl font-bold mt-4">
                {t('networkTitle').split('Without')[0]}
                <span className="metallic-gold-text">Without Borders.</span>
              </h2>
            </div>
            <div className="relative w-full aspect-video bg-primary-container/30 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="absolute bottom-8 left-8 grid grid-cols-3 gap-8 md:gap-12 z-10">
                {[
                  { val: t('n1'), label: t('n1Label') },
                  { val: t('n2'), label: t('n2Label') },
                  { val: t('n3'), label: t('n3Label') },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <span className="metallic-gold-text font-headline text-3xl font-black block">{val}</span>
                    <span className="text-on-primary-container text-[10px] uppercase font-bold tracking-widest">{label}</span>
                  </div>
                ))}
              </div>
              {/* Hub Markers */}
              {[
                { top: '30%', left: '75%', label: t('hub1') },
                { top: '40%', left: '60%', label: t('hub2') },
                { top: '35%', left: '48%', label: t('hub3') },
              ].map(({ top, left, label }) => (
                <div key={label} className="absolute group cursor-pointer" style={{ top, left }}>
                  <div className="w-3 h-3 bg-tertiary-fixed-dim rounded-full animate-pulse" />
                  <div className="hidden group-hover:block absolute top-full mt-2 bg-surface p-2 text-[10px] font-bold text-primary uppercase whitespace-nowrap z-20">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality */}
        <section id="quality" className="py-24 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="bg-surface-container-high p-8 md:p-16 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <div className="relative h-80 md:h-[500px]">
                  <Image src={QUALITY_IMG} alt="Quality assurance" fill className="object-cover editorial-shadow" unoptimized />
                </div>
              </div>
              <div className="md:w-1/2">
                <span className="text-secondary font-label text-xs uppercase tracking-[0.3em]">{t('qualityBadge')}</span>
                <h2 className="text-primary font-headline text-4xl font-bold mt-4 mb-8">
                  {t('qualityTitle').split('Quality')[0]}
                  <span className="metallic-gold-text">Quality.</span>
                </h2>
                <ul className="space-y-6">
                  {[
                    { icon: 'verified_user', title: t('q1Title'), desc: t('q1Desc') },
                    { icon: 'qr_code_2', title: t('q2Title'), desc: t('q2Desc') },
                    { icon: 'temp_preferences_eco', title: t('q3Title'), desc: t('q3Desc') },
                  ].map(({ icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary">{icon}</span>
                      <div>
                        <h5 className="text-primary font-bold">{title}</h5>
                        <p className="text-on-surface-variant text-sm">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
