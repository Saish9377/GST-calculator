import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — GST Calculator India',
  description: 'Read the privacy policy of GST Calculator India. Learn how we handle cookies, Google AdSense compliance, and user data privacy.',
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
