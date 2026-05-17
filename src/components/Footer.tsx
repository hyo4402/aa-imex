import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ADBb0uj0YNLs6Rh90DCwzLYfP5kEgHAKQRQ7E20PNfMKZIMC8jpM7ExHPDKgWIWgGtb4wkhSlHUG8BDS6JayUFOr80kcqeL8ryrk4Wh1uNtR3GjklFwHWRIyxZyUztM5CqFP_cbdII0K6k6-e5soZ5t3ZSXFxHadLgp42UdBRQ8TtlNXIB-BgulgJo8NZBXbimmV88mHjAa4fUAixPnFz8Pni0kGBoyz4UU-JII72VHSncs2w9B0vJEf76SYygldb3htNMYAEqq78rc5';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const productCats = [
    { label: t('cat1'), href: `/${locale}/products?category=frozen` },
    { label: t('cat2'), href: `/${locale}/products?category=agricultural` },
    { label: t('cat3'), href: `/${locale}/products?category=seafood` },
    { label: t('cat4'), href: `/${locale}/products?category=processed` },
  ];

  const quickLinks = [
    { label: t('link1'), href: `/${locale}/about` },
    { label: t('link2'), href: `/${locale}/about#network` },
    { label: t('link3'), href: `/${locale}/about#quality` },
  ];

  return (
    <footer className="bg-[#001830] pt-16 pb-8 border-t border-[#f2f4f5]/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-8 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="col-span-1">
          <div className="mb-6">
            <Image
              src={LOGO_URL}
              alt="AA-IMEX Logo"
              width={120}
              height={64}
              className="h-14 w-auto object-contain"
              unoptimized
            />
          </div>
          <p className="text-[#e1e3e4]/70 font-body text-sm leading-relaxed mb-6">
            {t('desc')}
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined metallic-gold-text">hub</span>
            <span className="material-symbols-outlined metallic-gold-text">language</span>
          </div>
        </div>

        {/* Product Categories */}
        <div>
          <h5 className="text-on-primary font-headline font-bold mb-6 text-sm uppercase tracking-widest">
            {t('col1')}
          </h5>
          <ul className="space-y-3 font-body text-sm">
            {productCats.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[#e1e3e4]/70 hover:text-[#e9c176] transition-colors hover:translate-x-1 inline-block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-on-primary font-headline font-bold mb-6 text-sm uppercase tracking-widest">
            {t('col2')}
          </h5>
          <ul className="space-y-3 font-body text-sm">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[#e1e3e4]/70 hover:text-[#e9c176] transition-colors hover:translate-x-1 inline-block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-on-primary font-headline font-bold mb-6 text-sm uppercase tracking-widest">
            {t('col3')}
          </h5>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-5 py-2.5 rounded font-headline font-semibold text-xs uppercase tracking-widest hover:bg-[#25486f] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            {tNav('requestQuote')}
          </Link>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-[#f2f4f5]/10 max-w-screen-2xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#e1e3e4]/40 font-body text-xs">{t('copyright')}</p>
        <div className="flex gap-8 text-[#e1e3e4]/40 text-xs">
          <a href="#" className="hover:text-[#e9c176] transition-colors">
            {t('privacy')}
          </a>
          <a href="#" className="hover:text-[#e9c176] transition-colors">
            {t('terms')}
          </a>
        </div>
      </div>
    </footer>
  );
}
