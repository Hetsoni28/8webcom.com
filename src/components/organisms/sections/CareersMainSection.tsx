'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  FileText, 
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { Heading } from '@/components/atoms/Heading';
import { Button } from '@/components/atoms/Button';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';
import { MAX_RESUME_MB, resumeError } from '@/lib/resume';
import { Recaptcha, RECAPTCHA_SITE_KEY, type RecaptchaHandle } from '@/components/molecules/Recaptcha';
import { trackEvent } from '@/components/atoms/Analytics';

export interface CareerBlock {
  heading: string;
  highlight?: string;
  text: string;
}

interface CareersMainSectionProps {
  /** Left-column text blocks (Sanity → Careers Page → Text blocks) */
  blocks: CareerBlock[];
  /** Form dropdown options (Sanity → Careers Page → Positions) */
  positions: string[];
}

export function CareersMainSection({ blocks, positions }: CareersMainSectionProps) {
  const { contact } = useSiteSettings();
  const SUBMIT_FALLBACK = `Sorry, something went wrong. Please call us on ${contact.phone} or email ${contact.email}.`;
  const activePositions = positions;
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    position: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<RecaptchaHandle>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For mobile, restrict strictly to numbers and max 10 digits
    if (name === 'mobile') {
      const numeric = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, mobile: numeric }));
      if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      if (errors.resume) setErrors(prev => ({ ...prev, resume: '' }));
    }
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

    if (!formData.position) {
      newErrors.position = "Please select a position for application.";
    }

    // Same rules as the server, checked before uploading so a too-large file fails with a clear message
    const resumeProblem = resumeError(resumeFile);
    if (resumeProblem) newErrors.resume = resumeProblem;

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
      const body = new FormData();
      body.append('name', formData.name);
      body.append('mobile', formData.mobile);
      body.append('email', formData.email);
      body.append('position', formData.position);
      if (resumeFile) body.append('resume', resumeFile);
      body.append('website', honeypot);
      if (recaptchaToken) body.append('recaptchaToken', recaptchaToken);
      // No Content-Type header: the browser sets the multipart boundary itself
      const request: RequestInit = { method: 'POST', body };
      const res = await fetch('/api/careers/', request);
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
      trackEvent('job_application', { form_name: 'careers', position: formData.position });
    } catch {
      setErrors({ submit: SUBMIT_FALLBACK });
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Content Column (Exact match to live screenshot) ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-10 pt-2"
          >
            {blocks.map((block, i) => (
              <div key={`${block.heading}-${i}`}>
                <Heading as={i === 0 ? 'h2' : 'h3'} size={i === 0 ? 'beast' : 'xl'} className="mb-6">
                  {block.heading}
                  {block.highlight && (
                    <>
                      {' '}
                      {i === 0 && <br className="hidden sm:inline" />}
                      <span className="text-[#0799B3]">{block.highlight}</span>
                    </>
                  )}
                </Heading>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">{block.text}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Right Form Column (Exact match to live screenshot) ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="bg-[#f0f7f9] p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#e2eef2] shadow-sm">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-[#1F2429]">Application Sent!</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Thank you for submitting your application. Our team will review your details and resume promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', mobile: '', email: '', position: '' });
                        setResumeFile(null);
                        setRecaptchaToken(null);
                      }}
                      className="inline-block mt-4 text-sm font-semibold text-[#0799B3] hover:underline"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Live Region for Screen Reader Announcements */}
                    <div className="sr-only" aria-live="polite" aria-atomic="true">
                      {isSubmitting && "Submitting your job application, please wait..."}
                      {Object.keys(errors).length > 0 && `The application form has ${Object.keys(errors).length} error${Object.keys(errors).length > 1 ? 's' : ''}. Please correct them before submitting.`}
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="career-name" className="sr-only">
                        Full Name (required)
                      </label>
                      <input
                        id="career-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name *"
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "error-career-name" : undefined}
                        className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] placeholder:text-gray-400 focus:outline-none transition-all ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                        }`}
                      />
                      {errors.name && (
                        <p id="error-career-name" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label htmlFor="career-mobile" className="sr-only">
                        Mobile Number 10 digits (required)
                      </label>
                      <input
                        id="career-mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        maxLength={10}
                        placeholder="Mobile (10 digits) *"
                        aria-required="true"
                        aria-invalid={Boolean(errors.mobile)}
                        aria-describedby={errors.mobile ? "error-career-mobile" : undefined}
                        className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] placeholder:text-gray-400 focus:outline-none transition-all ${
                          errors.mobile
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                        }`}
                      />
                      {errors.mobile && (
                        <p id="error-career-mobile" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.mobile}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="career-email" className="sr-only">
                        Email Address (required)
                      </label>
                      <input
                        id="career-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email *"
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "error-career-email" : undefined}
                        className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] placeholder:text-gray-400 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                        }`}
                      />
                      {errors.email && (
                        <p id="error-career-email" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Position Dropdown */}
                    <div className="relative">
                      <label htmlFor="career-position" className="sr-only">
                        Select Position for Application (required)
                      </label>
                      <select
                        id="career-position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        aria-required="true"
                        aria-invalid={Boolean(errors.position)}
                        aria-describedby={errors.position ? "error-career-position" : undefined}
                        className={`w-full px-5 py-3.5 rounded-xl border bg-white text-base sm:text-sm text-[#1F2429] focus:outline-none appearance-none transition-all cursor-pointer ${
                          errors.position
                            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 focus:border-[#0799B3] focus:ring-2 focus:ring-[#0799B3]/20'
                        }`}
                      >
                        <option value="" disabled>Select Your Position For Apply *</option>
                        {activePositions.map((pos) => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                      {errors.position && (
                        <p id="error-career-position" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.position}</span>
                        </p>
                      )}
                    </div>

                    {/* Upload Resume */}
                    <div className="space-y-1.5 pt-1">
                      <label htmlFor="career-resume" className="block text-xs font-semibold text-gray-700">
                        Upload Resume (PDF, DOC, DOCX · max {MAX_RESUME_MB} MB) *
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            fileInputRef.current?.click();
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label="Choose resume file to upload"
                        aria-describedby={errors.resume ? "error-career-resume" : undefined}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white hover:bg-gray-50/80 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] ${
                          errors.resume ? 'border-red-400' : 'border-gray-200'
                        }`}
                      >
                        <input
                          id="career-resume"
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="sr-only"
                          aria-required="true"
                          aria-invalid={Boolean(errors.resume)}
                        />
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 border border-gray-200 transition-colors shrink-0"
                          >
                            Choose file
                          </span>
                          <span className="text-xs text-gray-600 truncate">
                            {resumeFile ? resumeFile.name : "No file chosen"}
                          </span>
                        </div>
                        {resumeFile && (
                          <FileText className="w-4 h-4 text-[#0799B3] shrink-0" aria-hidden="true" />
                        )}
                      </div>
                      {errors.resume && (
                        <p id="error-career-resume" role="alert" className="text-xs text-red-500 font-medium mt-1 pl-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.resume}</span>
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
                          id="error-career-captcha"
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
                      className="absolute left-[-9999px] w-px h-px opacity-0"
                    />

                    {errors.submit && (
                      <div role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errors.submit}</span>
                      </div>
                    )}

                    {/* Submit Button (Exact match to screenshot) */}
                    <div className="pt-2">
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
                    </div>

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
