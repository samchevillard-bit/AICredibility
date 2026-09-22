import LegalPage, { legalMetadata } from '@/components/site/LegalPage';

export const metadata = legalMetadata('en');

export default function Page() {
  return <LegalPage locale="en" />;
}
