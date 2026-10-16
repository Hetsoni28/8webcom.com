// ─── Service Detail Pages Content ────────────────────────────

export const SERVICE_DETAIL = {
  "web-development": {
    subTitle: "Our Service",
    heading: "Web Development",
    hero: "https://www.8webcom.com/admin/upload/brochure/web-development.webp",
    intro:
      "We build fast, secure, and scalable websites tailored to your business goals using the latest technologies. From simple landing pages to complex enterprise web applications, we deliver quality and performance at every stage.",
    features: [
      { title: "Custom Website Design", description: "Pixel-perfect, brand-aligned designs built from scratch." },
      { title: "Responsive Development", description: "Flawless experience on all devices — mobile, tablet, desktop." },
      { title: "CMS Integration", description: "WordPress, Sanity, and headless CMS solutions for easy content management." },
      { title: "E-Commerce Development", description: "Shopify, Magento, WooCommerce, and custom cart solutions." },
      { title: "Performance Optimization", description: "Lightning-fast load times with Core Web Vitals optimization." },
      { title: "Maintenance & Support", description: "Ongoing support, updates, and security monitoring post-launch." },
    ],
    technologies: ["WordPress", "Next.js", "React", "Node.js", "PHP", "MySQL", "Shopify", "Magento"],
  },
  "web-portal": {
    subTitle: "Our Service",
    heading: "Web Portal",
    hero: "https://www.8webcom.com/admin/upload/brochure/web-portal1.webp",
    intro:
      "Custom web portal development that streamlines operations, manages data efficiently, and connects users across your organization. We build B2B portals, B2C portals, supplier portals, employee self-service portals and more.",
    features: [
      { title: "B2B / B2C Portals", description: "Tailored portals that connect businesses and customers seamlessly." },
      { title: "Employee Portals", description: "Internal HR and operations portals to increase workforce efficiency." },
      { title: "Vendor Management", description: "Supplier and vendor portals with approval workflows and reporting." },
      { title: "Data Dashboards", description: "Real-time analytics dashboards for decision-makers." },
      { title: "API Integrations", description: "Connect your portal with ERP, CRM, and third-party services." },
      { title: "Role-Based Access", description: "Granular permission controls for secure data access." },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "MySQL", "REST APIs", "React", "TypeScript"],
  },
  "digital-marketing": {
    subTitle: "Our Service",
    heading: "Digital Marketing",
    hero: "https://www.8webcom.com/admin/upload/brochure/digital_marketing3.webp",
    intro:
      "Drive traffic, generate qualified leads, and grow your brand through data-driven digital marketing strategies. Our team of experts crafts campaigns that deliver measurable ROI across all digital channels.",
    features: [
      { title: "Search Engine Optimization (SEO)", description: "Rank higher on Google with proven white-hat SEO strategies." },
      { title: "Pay-Per-Click (PPC)", description: "Google Ads and Meta Ads campaigns optimized for maximum ROI." },
      { title: "Social Media Marketing", description: "Build brand awareness and engagement on Instagram, Facebook, LinkedIn." },
      { title: "Content Marketing", description: "Blog posts, case studies, and copy that converts visitors into leads." },
      { title: "Email Marketing", description: "Targeted email campaigns to nurture leads and retain customers." },
      { title: "Analytics & Reporting", description: "Clear monthly reports showing traffic, leads, and revenue impact." },
    ],
    technologies: ["Google Ads", "Meta Ads", "Google Analytics", "SEMrush", "Mailchimp", "Canva", "HubSpot"],
  },
  "crm-solutions": {
    subTitle: "Our Service",
    heading: "CRM Solutions",
    hero: "https://www.8webcom.com/admin/upload/brochure/crm-solutions.webp",
    intro:
      "Manage your customer relationships efficiently with custom CRM systems built specifically for Indian businesses. From lead capture to deal closure and post-sale support, we automate your entire sales pipeline.",
    features: [
      { title: "Lead Management", description: "Capture, assign, and track leads from all your marketing channels." },
      { title: "Sales Pipeline", description: "Visual pipeline to track every deal from prospect to closure." },
      { title: "Customer Database", description: "Centralized customer records with complete interaction history." },
      { title: "Task & Follow-Up Automation", description: "Automated reminders and task assignments for your sales team." },
      { title: "Reports & Analytics", description: "Sales performance dashboards and revenue forecasting." },
      { title: "WhatsApp / Email Integration", description: "Communicate with leads directly from within the CRM." },
    ],
    technologies: ["Custom CRM", "Node.js", "React", "MySQL", "WhatsApp API", "Twilio", "REST APIs"],
  },
} as const;

// ─── About Page Content ───────────────────────────────────────

export const ABOUT_PAGE = {
  subTitle: "About Us",
  heading: "8WEBCOM.COM",
  story:
    "Welcome to 8webcom.com. We started our journey in 2011 delivering business websites and related services. Since then, we have grown into a full-service digital agency delivering end-to-end business solutions across the globe, expanding into Web Portals, Enterprise Software, Digital Marketing, CRM, E-Commerce, and consulting. With more than 2000 businesses — locally and internationally — trusting us for over a decade, we are proud to be Ahmedabad's most reliable digital partner.",
  mission:
    "Our mission is to help businesses of all sizes harness the power of technology to grow, compete, and thrive in the digital world.",
  vision:
    "To be the most trusted digital solutions provider in India, empowering businesses with innovative technology and exceptional service.",
  values: [
    { title: "Integrity", description: "We are transparent, honest, and accountable in everything we do." },
    { title: "Innovation", description: "We constantly evolve, adopting the latest technologies to deliver better outcomes." },
    { title: "Excellence", description: "We hold ourselves to the highest standards of quality and delivery." },
    { title: "Client First", description: "Your success is our success. We are deeply invested in your growth." },
  ],
  whyUs: [
    { stat: "10+",   label: "Years of Experience" },
    { stat: "1000+", label: "Happy Clients" },
    { stat: "1500+", label: "Projects Delivered" },
    { stat: "10+",   label: "Countries Clients Served" },
  ],
} as const;

// ─── Careers Page Content ─────────────────────────────────────

export const CAREERS_PAGE = {
  subTitle: "Join Our Team",
  heading: "Build Your Career at 8webcom",
  description:
    "We are always looking for talented, passionate individuals to join our growing team. At 8webcom, you will work on real-world projects, learn from industry experts, and grow both professionally and personally.",
  perks: [
    { title: "Flexible Work Hours",       icon: "clock" },
    { title: "Learning & Development",    icon: "book" },
    { title: "Competitive Salary",        icon: "wallet" },
    { title: "Friendly Team Culture",     icon: "users" },
    { title: "Career Growth Path",        icon: "trending-up" },
    { title: "Modern Office in Satellite", icon: "building" },
  ],
  openings: [
    {
      title: "Full Stack Developer",
      type: "Full Time",
      location: "Ahmedabad, Gujarat",
      experience: "2–4 years",
      skills: ["React", "Node.js", "MySQL", "REST APIs"],
    },
    {
      title: "WordPress Developer",
      type: "Full Time",
      location: "Ahmedabad, Gujarat",
      experience: "1–3 years",
      skills: ["WordPress", "PHP", "WooCommerce", "Elementor"],
    },
    {
      title: "Digital Marketing Executive",
      type: "Full Time",
      location: "Ahmedabad, Gujarat",
      experience: "1–2 years",
      skills: ["SEO", "Google Ads", "Meta Ads", "Content Writing"],
    },
    {
      title: "UI/UX Designer",
      type: "Full Time",
      location: "Ahmedabad, Gujarat",
      experience: "1–3 years",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    },
  ],
} as const;

// ─── Policy Pages Content ─────────────────────────────────────

export const DISCLAIMER_POLICY = {
  heading: "Disclaimer Policy",
  lastUpdated: "January 2026",
  intro:
    "The information contained in this website is for general information purposes only. Please review the official terms and conditions governing the use of 8webcom.com.",
  sections: [
    {
      title: "General Information & Warranty Disclaimer",
      content:
        "The information contained in this website is for general information purposes only. The information is provided by 8webcom and while we Endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.",
    },
    {
      title: "“As Is” and “As Available” Provision",
      content:
        "The web site, including, without limitation, all services, content, functions and materials provided through the website, are provided “as it is,” or “as available,” without warranty of any kind, either express or implied, including, without limitation, any warranty for information, data, data processing services, uptime or uninterrupted access, any warranties concerning the availability, payability, display ability, accuracy, usefulness, correctness, precision, thoroughness, completeness or content or information, and any warranties of title, non-infringement, merchantability or fitness for a particular purpose, and we hereby disclaim any and all such warranties, express and implied.",
    },
    {
      title: "No Guarantee of Timeliness or Error-Free Service",
      content:
        "We do not warrant that the website or the services, content, functions or materials provided through the website will be timely, secure, uninterrupted or error free, or that defects will be corrected. We make no warranty that the web site or provided services will meet users’ requirements. No advice, results or information, whether oral or written, obtained by you from us or through the web site shall create any warranty not expressly made herein.",
    },
    {
      title: "Limitation of Liability",
      content:
        "No event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.",
    },
    {
      title: "External Links & Third-Party Sites",
      content:
        "Through this website you will be able to link with other websites which are not under the control of 8webcom.com. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.",
    },
    {
      title: "Right to Alter Information & Accuracy Disclaimers",
      content:
        "We reserve the right to change or make corrections to any of the information provided on the web site at any time and without any prior warning. We will not be liable for any inaccuracy or omission concerning any of the information provided on the web site.",
    },
    {
      title: "Website Availability & Maintenance",
      content:
        "Every effort is made to keep the website up and running smoothly. However, 8webcom.com takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.",
    },
  ],
} as const;

export const REFUND_POLICY = {
  heading: "Refund And Cancellation Policy",
  lastUpdated: "January 2026",
  intro:
    "Official Refund and Cancellation Policy of 8webcom.com. Outlining our terms regarding service deficiency, prior communication, and refund processing.",
  sections: [
    {
      title: "Deficiency in Services",
      content:
        "8webcom.com shall process a refund to its paid user, if there is deficiency in Services, solely attributable to the fault, negligence, error etc. on the part of 8webcom.com in relation to the services availed by the paid user.",
    },
    {
      title: "Prior Notification via Email",
      content:
        "Such deficiency is informed to 8webcom.com beforehand by reaching 8webcom.com through an email to our email address info@8webcom.com, containing the complete details of the transactions.",
    },
    {
      title: "Refund Initiation & Failed Transactions",
      content:
        "All refunds shall be initiated as per 8webcom.com policy. In case of any users’ complaint regarding non-refund and/or non-credit for failed transactions the User shall reach us through the said email address.",
    },
  ],
} as const;

export const PRIVACY_POLICY = {
  heading: "Privacy Policy",
  lastUpdated: "January 2026",
  intro:
    "This Privacy Policy describes our policies on the collection use and disclosure of your information in connection with your use of our websites emails and mobile applications (“Site”).",
  sections: [
    {
      title: "Scope & Application",
      content:
        "This Privacy Policy describes our policies on the collection use and disclosure of your information in connection with your use of our websites emails and mobile applications (“Site”)",
    },
    {
      title: "Personal Privacy Protection",
      content:
        "8webcom respects your personal privacy. Any personal information collected on this site will be used only for the stated purpose. No personal information will be sold to or shared with other parties for marketing or any other purposes.",
    },
    {
      title: "Internet Provider Address Logging",
      content:
        "Information such as your Internet Provider address may be provided by your browser as you log into our site. That information will be used only for the administration of our site.",
    },
    {
      title: "Storage & Utilization of Submitted Data",
      content:
        "We may store the information you submit to or through the Site. We use the information to fulfill your requests provide Site functionality improve Site quality personalize your experience display relevant advertising provide customer support message you back up our systems allow for disaster recovery and comply with legal obligations.",
    },
    {
      title: "Account Registration Requirement",
      content:
        "You must provide a valid email address in order to sign up for an Account on the Site. In addition",
    },
    {
      title: "Profile Information & Default Emails",
      content:
        "you may provide us with your full name gender and birth date. When you sign up for an 8webcom account we opt you to receive emails from other 8webcom users business owners and 8webcom by default.",
    },
    {
      title: "Usage Analytics & Behavior Tracking",
      content:
        "We also collect and store information from and about you in the course of your use of the Site. We use this information to analyze and track user behavior personalize your experience associate it with other information about you provide the functionality and improve the quality of the Site and may use it to display relevant advertising.",
    },
    {
      title: "Device Location Tracking",
      content:
        "We may collect and store information about your location if you enable your computer or mobile device to send us location information. You may be able to change the settings on your computer or mobile device to prevent it from providing us with such information.",
    },
    {
      title: "Third-Party Data Access",
      content:
        "We do not rent share sell or trade personally identifiable information with third parties for their direct marketing purposes. That said we work with third parties and they may have access to some of your information",
    },
    {
      title: "Confidentiality of Messages",
      content:
        "Please also note that the messages you send or receive using the Site are only private to the extent that you and the sender/recipient keep them private. For example we do not have any control over whether a recipient of one of your personal messages publicly posts it or its contents.",
    },
    {
      title: "Data Processing, Storage & 5-Year Retention",
      content:
        "The information we obtain from or about you may be processed and stored in the United States of America. We may keep it as long as is permitted or required under the law. If you terminate your account we will remove your Public Content from the Site but may retain your data for a period of 5 years (or longer if required by law) in our active systems in order to ensure our ability to satisfy the authorized uses under this Privacy Policy.",
    },
    {
      title: "Industry Standard Security Transmission",
      content:
        "We follow generally accepted industry standards to protect the personal information submitted to us both during transmission and once we receive it. No method of transmission over the Internet or via mobile device or method of electronic storage is 100% secure however. Therefore",
    },
    {
      title: "Commercially Acceptable Safeguards",
      content:
        "while we strive to use commercially acceptable means to protect your personal information",
    },
    {
      title: "Absolute Security Disclaimer",
      content:
        "we cannot guarantee its absolute security.",
    },
  ],
} as const;

