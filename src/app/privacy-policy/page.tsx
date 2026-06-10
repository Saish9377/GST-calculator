'use client';

import { HiShieldCheck } from 'react-icons/hi2';

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-background dark:to-purple-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <HiShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Last updated: June 10, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-6 sm:p-10 space-y-6 text-sm sm:text-base text-muted leading-relaxed">
            <p>
              At GST Calculator India, accessible from <a href="https://gstcalculator.in" className="text-primary hover:underline">https://gstcalculator.in</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GST Calculator India and how we use it.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">1. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you do not agree with any of the terms outlined in this document, please discontinue use of the website and services.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">2. Information We Collect</h2>
            <p>
              Our calculators work locally in your browser. We do not store or process your financial figures, calculations, or tax logs on any server. Any calculation data you input remains entirely on your device.
            </p>
            <p>
              If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">3. How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide, operate, and maintain our website.</li>
              <li>Improve, personalize, and expand our website capabilities.</li>
              <li>Understand and analyze how you use our website.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you to provide customer support, updates, and feedback.</li>
              <li>Send you emails if you initiate contact.</li>
              <li>Find and prevent fraud.</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">4. Log Files</h2>
            <p>
              GST Calculator India follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">5. Google DoubleClick DART Cookie</h2>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">6. Third-Party Advertising Partners</h2>
            <p>
              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on GST Calculator India, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that GST Calculator India has no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">7. Indian IT Act Compliance</h2>
            <p>
              We process all digital data in compliance with the Information Technology Act, 2000 of India, and other applicable data privacy laws. We take appropriate technical security measures to protect the integrity of the information. For any grievances, you may contact our Grievance Officer at the contact email listed on our Contact Us page.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">8. Children&apos;s Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              GST Calculator India does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4 border-t border-border">9. Contact Us</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us by email at <a href="mailto:saishshinde92@gmail.com" className="text-primary hover:underline">saishshinde92@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
