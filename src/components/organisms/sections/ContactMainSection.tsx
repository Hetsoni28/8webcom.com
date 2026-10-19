'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/atoms/Heading';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { CONTACT_FORM_SERVICES, SOCIAL } from '@/lib/constants';
import { 
  CheckCircle2, 
  ChevronDown, 
  AlertCircle,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

export function ContactMainSection() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '',
    message: '',
  });

  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [isCaptchaExpired, setIsCaptchaExpired] = useState(false);
  const [captchaSecondsLeft, setCaptchaSecondsLeft] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formMousePos, setFormMousePos] = useState({ x: 0, y: 0 });
  const [isFormHovered, setIsFormHovered] = useState(false);

  const expiryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const handleCaptchaClick = () => {
    if (isCaptchaLoading) return;

    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    if (isCaptchaChecked) {
      setIsCaptchaChecked(false);
      setCaptchaSecondsLeft(null);
      return;
    }

    setIsCaptchaLoading(true);
    setIsCaptchaExpired(false);
    setErrors(prev => ({ ...prev, captcha: '' }));

    setTimeout(() => {
      setIsCaptchaLoading(false);
      setIsCaptchaChecked(true);
      setCaptchaSecondsLeft(60);

      countdownIntervalRef.current = setInterval(() => {
        setCaptchaSecondsLeft(prev => {
          if (prev === null || prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      expiryTimerRef.current = setTimeout(() => {
        setIsCaptchaChecked(false);
        setIsCaptchaExpired(true);
        setCaptchaSecondsLeft(null);
      }, 60000);
    }, 1200);
  };

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

    if (isCaptchaExpired) {
      newErrors.captcha = "Verification has expired. Check the checkbox again.";
    } else if (!isCaptchaChecked) {
      newErrors.captcha = "Please verify that you are not a robot.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }, 1000);
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative ambient background glows with smooth floating animations */}
      <motion.div 
        animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0799B3]/5 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F58220]/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Content Column (Beast Typography & Trust Highlights) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-10 pt-2"
          >
            <div>
              <Badge variant="primary" label="GET IN TOUCH" className="mb-4" />
              
              <Heading as="h2" size="beast" className="mb-6 leading-[1.1]">
                Let's Build Something <br className="hidden sm:inline" />
                <span className="text-[#0799B3]">Great Together</span>
              </Heading>

              <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">
                Have an ambitious web project, need a tailored enterprise portal, or looking to scale your business with performance marketing? Reach out to our expert team in Ahmedabad for a direct consultation.
              </p>
            </div>

            {/* Value Highlights with Smooth Hover & Spring Physics */}
            <div className="space-y-5 pt-2">
              <motion.div 
                whileHover={{ y: -4, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-[#0799B3]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0799B3]/10 flex items-center justify-center text-[#0799B3] shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#0799B3] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1F2429] mb-1 group-hover:text-[#0799B3] transition-colors duration-300">Guaranteed Fast Response</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-normal">
                    We review all client inquiries within 24 business hours with dedicated technical consultation.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-[#F58220]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F58220]/10 flex items-center justify-center text-[#F58220] shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#F58220] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1F2429] mb-1 group-hover:text-[#F58220] transition-colors duration-300">Confidential & Secure</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-normal">
                    All project briefs, client requirements, and NDAs are handled with strict enterprise confidentiality.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-[#0799B3]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0799B3]/10 flex items-center justify-center text-[#0799B3] shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#0799B3] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1F2429] mb-1 group-hover:text-[#0799B3] transition-colors duration-300">15+ Years & 2000+ Clients</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-normal">
                    Trusted by local and international businesses since 2011 for high-performance digital engineering.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Connection Row */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-4">
                Connect on Official Channels
              </span>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL.slice(0, 5).map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-[#0799B3] hover:text-white text-xs font-bold text-gray-600 shadow-sm hover:shadow-md transition-colors duration-300"
                  >
                    {item.name}
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
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setFormMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseEnter={() => setIsFormHovered(true)}
              onMouseLeave={() => setIsFormHovered(false)}
              className="relative bg-[#f0f7f9] p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#e2eef2] shadow-sm overflow-hidden"
            >
              {/* Interactive mouse spotlight glow */}
              {isFormHovered && (
                <div
                  className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 z-0"
                  style={{
                    background: `radial-gradient(400px circle at ${formMousePos.x}px ${formMousePos.y}px, rgba(7, 153, 179, 0.08), transparent 80%)`,
                  }}
                />
              )}
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
                        setIsCaptchaChecked(false);
                        setIsCaptchaExpired(false);
                        setCaptchaSecondsLeft(null);
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
                        {CONTACT_FORM_SERVICES.map((srv) => (
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

                    {/* reCAPTCHA Widget with Keyboard Navigation, Real Expiration & Loading Animation */}
                    <div className="pt-2">
                      <motion.div
                        role="checkbox"
                        tabIndex={0}
                        aria-checked={isCaptchaChecked}
                        aria-label="I'm not a robot reCAPTCHA verification"
                        aria-describedby={errors.captcha ? "error-contact-captcha" : undefined}
                        onClick={handleCaptchaClick}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            handleCaptchaClick();
                          }
                        }}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`w-full max-w-[304px] h-[78px] px-3.5 py-2.5 rounded-[4px] border shadow-[0_0_4px_rgba(0,0,0,0.06)] flex items-center justify-between select-none cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 ${
                          isCaptchaExpired
                            ? 'border-[#d93025] bg-[#fff8f7]'
                            : errors.captcha
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-[#d3d3d3] bg-[#f9f9f9] hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          {isCaptchaLoading ? (
                            <div className="w-7 h-7 flex items-center justify-center shrink-0">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                                className="w-6 h-6 rounded-full border-[3px] border-[#1A73E8] border-t-transparent"
                              />
                            </div>
                          ) : isCaptchaChecked ? (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 450, damping: 20 }}
                              className="w-7 h-7 rounded-[2px] bg-white border border-[#2e7d32] flex items-center justify-center shrink-0 shadow-sm"
                            >
                              <svg className="w-5 h-5 text-[#2e7d32]" viewBox="0 0 24 24" fill="none">
                                <motion.path
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.35, ease: "easeOut" }}
                                  d="M4.5 12.5L9.5 17.5L19.5 6.5"
                                  stroke="#2e7d32"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.div>
                          ) : (
                            <div
                              className={`w-7 h-7 rounded-[2px] border-2 bg-white flex items-center justify-center transition-colors shrink-0 ${
                                isCaptchaExpired ? 'border-[#d93025]' : 'border-[#c1c1c1] hover:border-gray-500'
                              }`}
                            />
                          )}

                          <div className="flex flex-col">
                            <span className="text-[14px] text-[#282727] font-normal">
                              I'm not a robot
                            </span>
                            {isCaptchaChecked && captchaSecondsLeft !== null && (
                              <span className="text-[10px] text-emerald-600 font-medium">
                                Verified (expires in {captchaSecondsLeft}s)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center shrink-0 pr-1">
                          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                            <path d="M24 8C32.8366 8 40 15.1634 40 24H35C35 17.9249 30.0751 13 24 13V8Z" fill="#1A73E8"/>
                            <path d="M24 4L30 10.5L24 17V4Z" fill="#1A73E8"/>
                            <path d="M24 40C15.1634 40 8 32.8366 8 24H13C13 30.0751 17.9249 35 24 35V40Z" fill="#80868B"/>
                            <path d="M24 44L18 37.5L24 31V44Z" fill="#80868B"/>
                          </svg>
                          <span className="text-[10px] text-[#555] font-normal leading-none mt-1" aria-hidden="true">reCAPTCHA</span>
                        </div>
                      </motion.div>

                      {/* Expiration warning message */}
                      {isCaptchaExpired ? (
                        <motion.div
                          id="error-contact-captcha"
                          role="alert"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 text-xs text-[#d93025] font-semibold mt-2 pl-1"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0 text-[#d93025]" aria-hidden="true" />
                          <span>Verification expired. Check the checkbox again.</span>
                        </motion.div>
                      ) : errors.captcha ? (
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
                      ) : null}

                      {/* Developer test expiration trigger */}
                      {isCaptchaChecked && (
                        <div className="pt-1 pl-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
                              if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
                              setIsCaptchaChecked(false);
                              setIsCaptchaExpired(true);
                              setCaptchaSecondsLeft(null);
                            }}
                            className="text-[11px] text-gray-400 hover:text-[#d93025] underline transition-colors"
                          >
                            ⚡ Test Expiration Now
                          </button>
                        </div>
                      )}
                    </div>

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
                        className="w-full !rounded-2xl py-4 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
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
