'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import type { Product } from '@/lib/sheets';

interface ProductsClientProps {
  products: Product[];
  locale: string;
  initialCategory: string;
}

export default function ProductsClient({ products, locale, initialCategory }: ProductsClientProps) {
  const t = useTranslations('products');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => (locale === 'vn' ? p.category_vn : p.category_en)));
    return Array.from(set).filter(Boolean);
  }, [products, locale]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const name = locale === 'vn' ? p.name_vn : p.name_en;
      const cat = locale === 'vn' ? p.category_vn : p.category_en;
      const matchesSearch =
        !search ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCat = !activeCategory || cat === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, search, activeCategory, locale]);

  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* Sidebar */}
      <aside className="space-y-12">
        {/* Search */}
        <div>
          <h3 className="text-primary font-bold text-sm tracking-tight mb-4 uppercase">{t('searchLabel')}</h3>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 transition-all py-3 pl-10 text-sm font-body outline-none"
            />
            <span className="material-symbols-outlined absolute left-2 top-3 text-on-surface-variant text-xl">search</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-primary font-bold text-sm tracking-tight mb-6 uppercase">{t('categoriesLabel')}</h3>
          <ul className="space-y-4 font-body text-sm">
            <li>
              <button
                onClick={() => setActiveCategory('')}
                className={`flex items-center justify-between w-full group ${
                  !activeCategory ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span>{t('allCategories')}</span>
                <span className="text-[10px] bg-secondary-container px-2 py-0.5 rounded text-on-secondary-container">
                  {products.length}
                </span>
              </button>
            </li>
            {categories.map((cat) => {
              const count = products.filter((p) =>
                (locale === 'vn' ? p.category_vn : p.category_en) === cat
              ).length;
              return (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center justify-between w-full group ${
                      activeCategory === cat ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] bg-surface-container px-2 py-0.5 rounded">
                      {count.toString().padStart(2, '0')}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quality box */}
        <div className="p-6 bg-surface-container-low rounded-lg border-l-4 gold-border-accent">
          <h3 className="text-primary font-bold text-sm tracking-tight mb-4 uppercase">{t('qualityLabel')}</h3>
          <div className="space-y-4">
            {['ISO 22000 Certified', 'Global GAP Compliant', 'HACCP Gold Standard'].map((label) => (
              <div key={label} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b38728] material-symbols-filled">verified</span>
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="lg:col-span-3">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/10">
          <span className="text-on-surface-variant text-sm font-body">
            {t('showing', { count: filtered.length })}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">inventory_2</span>
            <p className="text-on-surface-variant font-body">No products found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
            {filtered.map((product) => {
              const name = locale === 'vn' ? product.name_vn || product.name_en : product.name_en;
              const desc = locale === 'vn' ? product.desc_short_vn || product.desc_short_en : product.desc_short_en;
              const category = locale === 'vn' ? product.category_vn || product.category_en : product.category_en;
              return (
                <div key={product.slug} className="group">
                  <Link href={`/${locale}/products/${product.slug}`}>
                    <div className="relative aspect-[4/5] bg-surface-container-low mb-6 overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={name}
                          fill
                          className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container">
                          <span className="material-symbols-outlined text-6xl text-outline-variant">image</span>
                        </div>
                      )}
                      {category && (
                        <div className="absolute top-4 left-4 bg-[#b38728] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-md">
                          {category}
                        </div>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-primary mb-2 group-hover:metallic-gold-text transition-all duration-300 font-headline">
                      {name}
                    </h4>
                    <p className="text-sm text-on-surface-variant font-body mb-4 line-clamp-2">{desc}</p>
                    <div className="flex items-center gap-4 mb-6 flex-wrap">
                      {product.origin && (
                        <div className="flex items-center gap-1 text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          <span className="text-[11px] font-bold uppercase tracking-tighter">
                            {t('origin')}: {product.origin}
                          </span>
                        </div>
                      )}
                      {product.packaging && (
                        <div className="flex items-center gap-1 text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">package_2</span>
                          <span className="text-[11px] font-bold uppercase tracking-tighter">{product.packaging}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <Link
                    href={`/${locale}/contact?product=${encodeURIComponent(name)}`}
                    className="block w-full bg-primary text-on-primary py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors text-center group-hover:shadow-lg"
                  >
                    {t('requestQuote')}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
