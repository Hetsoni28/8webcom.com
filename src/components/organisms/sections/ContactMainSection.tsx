'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/atoms/Heading';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';
import { trackPointer } from '@/lib/utils';
import { Recaptcha, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from '@/components/molecules/Recaptcha';
import { trackEvent } from '@/components/atoms/Analytics';

import { 
  CheckCircle2, 
  ChevronDown, 
  AlertCircle,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

// Same three icons/colours as before, cycled for any number of trust points
const HIGHLIGHT_STYLE = [
  { Icon: Clock, accent: '#0799B3' },
  { Icon: Shield, accent: '#F58220' },
  { Icon: Zap, accent: '#0799B3' },
];

export interface ContactIntro {
  subTitle?: string;
  heading: string;
  highlight?: string;
  description: string;
  highlights: { title: string; description?: string }[];
  channelsTitle: string;
}

export function ContactMainSection({ intro, formServices }: { intro: ContactIntro; formServices: string[] }) {
  const { contact, socialLinks } = useSiteSettings();
  const SUBMIT_FALLBACK = `Sorry, something went wrong. Please call us on ${contact.phone} or email ${contact.email}.`;
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '',
    message: '',
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<RecaptchaHandle>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'mobile') {
      const numeric = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, mobile: numeric }));
      if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service you need.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a brief description of your project.";
    }

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      newErrors.captcha = 'Please tick “I’m not a robot” before sending.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Read the honeypot before any await (currentTarget is cleared afterwards)
    const honeypot = String(new FormData(e.currentTarget).get('website') ?? '');

    setIsSubmitting(true);
    try {
      const request: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot, recaptchaToken }),
      };
      const res = await fetch('/api/contact/', request);
      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.ok) {
        const fieldErrors: Record<string, string> = result.errors ?? {};
        setErrors({
          ...fieldErrors,
          submit: result.error ?? (Object.keys(fieldErrors).length ? 'Please correct the highlighted fields.' : SUBMIT_FALLBACK),
        });
        recaptchaRef.current?.reset(); // the token was used up by this attempt
        return;
      }

      setIsSubmitted(true);
      trackEvent('generate_lead', { form_name: 'contact', service: formData.service });
    } catch {
      setErrors({ submit: SUBMIT_FALLBACK });
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative ambient background glows with smooth floating animations */}

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Content Column (Beast Typography & Trust Highlights) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-10 pt-2"
          >
            <div>
              {intro.subTitle && <Badge variant="primary" label={intro.subTitle} className="mb-4" />}

              <Heading as="h2" size="beast" className="mb-6">
                {intro.heading}
                {intro.highlight && (
                  <>
                    {' '}
                    <br className="hidden sm:inline" />
                    <span className="text-[#0799B3]">{intro.highlight}</span>
                  </>
                )}
              </Heading>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">{intro.description}</p>
            </div>

            {/* Trust points (Sanity → Contact Page → Form section) */}
            <div className="space-y-5 pt-2">
              {intro.highlights.map((item, i) => {
                const { Icon, accent } = HIGHLIGHT_STYLE[i % HIGHLIGHT_STYLE.length];
                return (
                  <motion.div
                    key={`${item.title}-${i}`}
                    whileHover={{ y: -4, scale: 1.012 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-default"
                    style={{ ["--accent" as string]: accent }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 shadow-sm text-(--accent) bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] group-hover:scale-110 group-hover:bg-(--accent) group-hover:text-white">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1F2429] mb-1 transition-colors duration-300 group-hover:text-(--accent)">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social links (Sanity → Site Settings → Social media) */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-4">
                {intro.channelsTitle}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.slice(0, 5).map((item) => (
                  <motion.a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-[#0799B3] hover:text-white text-xs font-bold text-gray-600 shadow-sm hover:shadow-md transition-colors duration-300"
                  >
                    {item.platform}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right Form Column (Full Interactive Contact Card) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div
              onMouseMove={trackPointer}
              className="group/spot relative bg-[#f0f7f9] p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#e2eef2] shadow-sm overflow-hidden"
            >
              {/* Mouse spotlight: CSS variables only, so typing never re-renders on mouse move */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(400px circle at var(--mx) var(--my), rgba(7, 153, 179, 0.08), transparent 80%)',
                }}
              />
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <Heading as="h3" size="md">Message Delivered!</Heading>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                      Thank you for contacting 8webcom.com! We have received your inquiry and our project consultant will get back to you shortly.
                    </p>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', mobile: '', email: '', service: '', message: '' });
                        setRecaptchaToken(null);
                      }}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-4 relative z-10" noValidate>
                    {/* Live Region for Screen Reader Announcements */}
                    <div className="sr-only" aria-live="polite" aria-atomic="true">
                      {isSubmitting && "Submitting your message, please wait..."}
                      {Object.keys(errors).length > 0 && `The form has ${Object.keys(errors).length} error${Object.keys(errors).length > 1 ? 's' : ''}. Please correct them before submitting.`}
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="sr-only">
                        Your Full Name (required)
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name *"
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "error-contact-name" : undefined}
                        className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] placeholder:text-gray-400 focus:outline-none transition-all ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                        }`}
                      />
                      {errors.name && (
                        <p id="error-contact-name" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mobile */}
                      <div>
                        <label htmlFor="contact-mobile" className="sr-only">
                          Mobile Number 10 digits (required)
                        </label>
                        <input
                          id="contact-mobile"
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          maxLength={10}
                          placeholder="Mobile (10 digits) *"
                          aria-required="true"
                          aria-invalid={Boolean(errors.mobile)}
                          aria-describedby={errors.mobile ? "error-contact-mobile" : undefined}
                          className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] placeholder:text-gray-400 focus:outline-none transition-all ${
                            errors.mobile
                              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                              : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                          }`}
                        />
                        {errors.mobile && (
                          <p id="error-contact-mobile" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.mobile}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="sr-only">
                          Email Address (required)
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address *"
                          aria-required="true"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "error-contact-email" : undefined}
                          className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] placeholder:text-gray-400 focus:outline-none transition-all ${
                            errors.email
                              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                              : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                          }`}
                        />
                        {errors.email && (
                          <p id="error-contact-email" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Services Dropdown */}
                    <div className="relative">
                      <label htmlFor="contact-service" className="sr-only">
                        Select Service (required)
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-invalid={Boolean(errors.service)}
                        aria-describedby={errors.service ? "error-contact-service" : undefined}
                        className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] focus:outline-none appearance-none transition-all cursor-pointer ${
                          errors.service
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                        }`}
                      >
                        <option value="" disabled>Select Service *</option>
                        {formServices.map((srv) => (
                          <option key={srv} value={srv}>{srv}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                      {errors.service && (
                        <p id="error-contact-service" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.service}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label htmlFor="contact-message" className="sr-only">
                        Your Message or Project Inquiry (required)
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell us about your project or inquiry... *"
                        aria-required="true"
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "error-contact-message" : undefined}
                        className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] placeholder:text-gray-400 focus:outline-none transition-all resize-y ${
                          errors.message
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                        }`}
                      />
                      {errors.message && (
                        <p id="error-contact-message" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Google reCAPTCHA v2 — verified again on the server */}
                    <div className="pt-2">
                      <Recaptcha
                        ref={recaptchaRef}
                        onChange={(token) => {
                          setRecaptchaToken(token);
                          if (token) setErrors((prev) => ({ ...prev, captcha: '' }));
                        }}
                      />
                      {errors.captcha && (
                        <motion.div
                          id="error-contact-captcha"
                          role="alert"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-2 pl-1"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>{errors.captcha}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Honeypot: hidden from people, filled in by spam bots */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] w-px h-px opacity-0"
                    />

                    {errors.submit && (
                      <div role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errors.submit}</span>
                      </div>
                    )}

                    {/* Submit Button with Spring Hover & Tap Physics */}
                    <motion.div 
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.988 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="pt-2"
                    >
                      <Button
                        type="submit"
                        variant="primary"
                        loading={isSubmitting}
                        className="w-full rounded-2xl! py-4 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        icon={
                          <svg
                            className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        }
                      >
                        Send Message
                      </Button>
                    </motion.div>

                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
