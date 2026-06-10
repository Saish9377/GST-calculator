'use client';

import { HiUserGroup, HiShieldCheck, HiOutlineSparkles, HiLightBulb } from 'react-icons/hi2';

export default function AboutPage() {
  return (
    <>
      {/* Hero Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-background dark:to-purple-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <HiUserGroup className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              About <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Empowering Indian businesses with modern financial tools
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-6 sm:p-10 mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
              Welcome to GST Calculator India, your trusted online destination for quick, accurate, and easy financial calculation utilities. Our platform was founded with a single, clear objective: to simplify the complex world of Goods and Services Tax (GST) compliance for small businesses, retail merchants, startup founders, freelancers, and Chartered Accountants across India.
            </p>

            <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
              As the Indian tax landscape evolves, calculating GST amounts, splitting taxes between Central (CGST), State (SGST), and Integrated (IGST) components, and formatting compliance-ready tax invoices can become a daily operational challenge. Our tools are engineered to eliminate this friction entirely. We combine modern web technologies with a highly intuitive, responsive design system to deliver real-time calculations instantly on both desktop and mobile devices.
            </p>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Our calculators are 100% free, require no user registration, and run completely in your local browser for maximum privacy and data security. Beyond simple calculations, we are committed to providing updated tax guides, slab directories, and professional PDF invoice generation capabilities to support the digital expansion of Indian businesses. We believe that professional financial tools should be accessible to everyone without paywalls. Thank you for choosing us as your daily tax utility partner.
            </p>
          </div>

          {/* Value Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <HiShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">100% Secure</h3>
              <p className="text-xs text-muted leading-relaxed">
                Calculations are processed locally in your browser. We never collect or store your financial values.
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <HiOutlineSparkles className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">Always Accurate</h3>
              <p className="text-xs text-muted leading-relaxed">
                Utilizes precise mathematical algorithms matching official Indian GST rules and rounding standards.
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                <HiLightBulb className="w-6 h-6 text-violet-500" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2">Built for SMEs</h3>
              <p className="text-xs text-muted leading-relaxed">
                Designed specifically for Indian merchants, traders, startups, and CAs for frictionless tax calculations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
