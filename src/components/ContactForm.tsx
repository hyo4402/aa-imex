'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';

interface ContactFormProps {
  locale: string;
  defaultProduct?: string;
}

export default function ContactForm({ locale, defaultProduct }: ContactFormProps) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      inquiry_type: (form.elements.namedItem('inquiry_type') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-secondary-container p-12 rounded-xl text-center">
        <span className="material-symbols-outlined text-6xl text-secondary mb-4 block material-symbols-filled">
          check_circle
        </span>
        <h3 className="font-headline font-bold text-2xl text-primary mb-2">{t('submitSuccess')}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="font-label font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
            {t('fieldName')}
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder={t('fieldNamePlaceholder')}
            className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 transition-all p-4 font-body outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
            {t('fieldCompany')}
          </label>
          <input
            name="company"
            type="text"
            required
            placeholder={t('fieldCompanyPlaceholder')}
            className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 transition-all p-4 font-body outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="font-label font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
            {t('fieldEmail')}
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder={t('fieldEmailPlaceholder')}
            className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 transition-all p-4 font-body outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
            {t('fieldPhone')}
          </label>
          <input
            name="phone"
            type="tel"
            placeholder={t('fieldPhonePlaceholder')}
            className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 transition-all p-4 font-body outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-label font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
          {t('fieldInquiry')}
        </label>
        <select
          name="inquiry_type"
          required
          className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 transition-all p-4 font-body appearance-none outline-none"
        >
          {[t('inquiry1'), t('inquiry2'), t('inquiry3'), t('inquiry4'), t('inquiry5')].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-label font-semibold text-xs text-on-surface-variant uppercase tracking-wider">
          {t('fieldMessage')}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          defaultValue={defaultProduct ? `Inquiry about: ${defaultProduct}\n\n` : ''}
          placeholder={t('fieldMessagePlaceholder')}
          className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 transition-all p-4 font-body outline-none resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-error text-sm font-medium">{t('submitError')}</p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group flex items-center gap-3 bg-primary text-on-primary px-10 py-5 font-headline font-bold text-sm tracking-widest uppercase hover:bg-primary-container transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Sending...
            </>
          ) : (
            <>
              {t('submitBtn')}
              <span className="material-symbols-outlined text-tertiary-fixed-dim transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
