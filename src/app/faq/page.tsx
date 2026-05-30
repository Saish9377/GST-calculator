'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { HiChevronDown, HiQuestionMarkCircle } from 'react-icons/hi2';

const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'What is GST?',
        a: 'GST (Goods and Services Tax) is a comprehensive indirect tax on the supply of goods and services in India. Introduced on July 1, 2017, it replaced multiple cascading taxes like VAT, service tax, and excise duty with a single unified tax.',
      },
      {
        q: 'What are the different types of GST in India?',
        a: 'There are three types of GST: CGST (Central GST) collected by the Central Government, SGST (State GST) collected by State Governments, and IGST (Integrated GST) collected on inter-state transactions. CGST and SGST apply to intra-state sales, while IGST applies to inter-state sales.',
      },
      {
        q: 'What are the current GST slabs in India?',
        a: 'India has four primary GST slabs: 5%, 12%, 18%, and 28%. Additionally, some goods are exempt (0%), and precious metals like gold attract 3% GST. Certain luxury and demerit goods may also attract an additional cess.',
      },
      {
        q: 'Who needs to register for GST?',
        a: 'Businesses with an annual turnover exceeding ₹40 lakh (₹20 lakh for special category states) must register for GST. Additionally, certain categories like inter-state suppliers, e-commerce operators, and casual taxable persons must register regardless of turnover.',
      },
    ],
  },
  {
    category: 'Calculation',
    items: [
      {
        q: 'How do I add GST to an amount?',
        a: 'To add GST: GST Amount = Base Amount × (GST Rate / 100). Total = Base Amount + GST Amount. Example: ₹1,000 at 18% GST → GST = ₹180, Total = ₹1,180.',
      },
      {
        q: 'How do I remove GST from a total amount?',
        a: 'To remove GST: Base Amount = Total ÷ (1 + GST Rate/100). Example: ₹1,180 at 18% GST → Base = 1180 ÷ 1.18 = ₹1,000.',
      },
      {
        q: 'How is CGST and SGST calculated?',
        a: 'For intra-state transactions, the total GST is split equally into CGST and SGST. For example, if the GST rate is 18%, CGST = 9% and SGST = 9%. Both are applied on the base amount.',
      },
      {
        q: 'When is IGST charged instead of CGST + SGST?',
        a: 'IGST is charged on inter-state transactions — when the seller and buyer are in different states. For imports, IGST is also applicable. The full GST rate is charged as IGST (e.g., 18% IGST instead of 9% CGST + 9% SGST).',
      },
    ],
  },
  {
    category: 'This Tool',
    items: [
      {
        q: 'Is this GST calculator free to use?',
        a: 'Yes, our GST calculator is completely free. You can perform unlimited calculations, generate invoices, and download PDFs without any charges or registration.',
      },
      {
        q: 'How accurate is this calculator?',
        a: 'Our calculator uses precise mathematical formulas and rounds to 2 decimal places, ensuring accuracy matching official GST calculations. It correctly handles all rate slabs and CGST/SGST/IGST split.',
      },
      {
        q: 'Can I save my calculations?',
        a: 'Yes! All calculations are automatically saved in your browser\'s local storage. Click the "History" button in the calculator to view, reload, or delete past calculations.',
      },
      {
        q: 'Can I generate GST invoices?',
        a: 'Yes! Our Invoice Generator lets you create professional GST-compliant invoices with buyer/seller details, GSTIN, itemized billing, complete tax breakdown, and PDF download.',
      },
    ],
  },
  {
    category: 'Business',
    items: [
      {
        q: 'What is Input Tax Credit (ITC)?',
        a: 'ITC allows businesses to claim credit for GST paid on purchases (inputs) against the GST collected on sales (output). This prevents cascading taxes and reduces the effective tax burden.',
      },
      {
        q: 'What is the GST composition scheme?',
        a: 'The composition scheme is for small businesses with turnover up to ₹1.5 crore. They pay GST at a fixed rate (1-6%) without input tax credit. It simplifies compliance with quarterly returns instead of monthly.',
      },
      {
        q: 'What is reverse charge mechanism?',
        a: 'Under RCM, the recipient pays GST instead of the supplier. This applies to specific goods/services notified by the government, such as services from unregistered suppliers or certain imports.',
      },
      {
        q: 'What is GSTIN?',
        a: 'GSTIN is a 15-digit Goods and Services Tax Identification Number assigned to every registered taxpayer. Format: First 2 digits = state code, next 10 = PAN, 13th = entity number, 14th = Z (default), 15th = checksum.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-background dark:to-purple-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <HiQuestionMarkCircle className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about GST, calculations, and our tools
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-primary" />
                {category.category}
              </h2>
              <div className="space-y-2">
                {category.items.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-5 text-left hover:bg-background/50 transition-colors cursor-pointer"
      >
        <div className={`w-6 h-6 mt-0.5 rounded-lg flex-shrink-0 flex items-center justify-center transition-colors ${
          open ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
        }`}>
          <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
        <span className="text-sm font-semibold text-foreground">{question}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-5 pb-5 pl-14">
          <p className="text-sm text-muted leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
