'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ADBb0uj0YNLs6Rh90DCwzLYfP5kEgHAKQRQ7E20PNfMKZIMC8jpM7ExHPDKgWIWgGtb4wkhSlHUG8BDS6JayUFOr80kcqeL8ryrk4Wh1uNtR3GjklFwHWRIyxZyUztM5CqFP_cbdII0K6k6-e5soZ5t3ZSXFxHadLgp42UdBRQ8TtlNXIB-BgulgJo8NZBXbimmV88mHjAa4fUAixPnFz8Pni0kGBoyz4UU-JII72VHSncs2w9B0vJEf76SYygldb3htNMYAEqq78rc5';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'products', href: `/${locale}/products` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  function isActive(href: string) {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  }

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || `/${newLocale}`);
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8fafb]/80 backdrop-blur-md shadow-sm shadow-[#191c1d]/5 border-b border-[#f2f4f5]/15">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src={LOGO_URL}
            alt="AA-IMEX Logo"
            width={120}
            height={48}
            className="h-10 md:h-12 w-auto object-contain"
            unoptimized
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`font-headline font-semibold text-sm tracking-tight transition-colors ${
                isActive(href)
                  ? 'metallic-gold-text border-b-2 border-[#e9c176] pb-1'
                  : 'text-[#3f6653] hover:text-[#001830]'
              }`}
            >
              {t(key)}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-1 font-headline font-semibold text-sm">
            <button
              onClick={() => switchLocale('en')}
              className={`px-2 py-0.5 transition-colors ${
                locale === 'en' ? 'metallic-gold-text font-bold' : 'text-[#3f6653] hover:text-[#001830]'
              }`}
            >
              EN
            </button>
            <span className="text-[#c3c6cf]">|</span>
            <button
              onClick={() => switchLocale('vn')}
              className={`px-2 py-0.5 transition-colors ${
                locale === 'vn' ? 'metallic-gold-text font-bold' : 'text-[#3f6653] hover:text-[#001830]'
              }`}
            >
              VN
            </button>
          </div>
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded-lg font-headline font-semibold text-sm hover:bg-primary-container hover:-translate-y-px transition-all active:scale-95"
          >
            {t('requestQuote')}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f8fafb] border-t border-[#f2f4f5]/30 px-6 py-4 space-y-3">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block font-headline font-semibold text-sm py-2 transition-colors ${
                isActive(href) ? 'metallic-gold-text' : 'text-[#3f6653]'
              }`}
            >
              {t(key)}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => { switchLocale('en'); setMobileOpen(false); }}
              className={`font-headline font-semibold text-sm ${locale === 'en' ? 'metallic-gold-text' : 'text-[#3f6653]'}`}
            >
              EN
            </button>
            <span className="text-[#c3c6cf]">|</span>
            <button
              onClick={() => { switchLocale('vn'); setMobileOpen(false); }}
              className={`font-headline font-semibold text-sm ${locale === 'vn' ? 'metallic-gold-text' : 'text-[#3f6653]'}`}
            >
              VN
            </button>
          </div>
          <Link
            href={`/${locale}/contact`}
            onClick={() => setMobileOpen(false)}
            className="block bg-primary text-on-primary px-6 py-3 rounded-lg font-headline font-semibold text-sm text-center mt-2"
          >
            {t('requestQuote')}
          </Link>
        </div>
      )}
    </nav>
  );
}
