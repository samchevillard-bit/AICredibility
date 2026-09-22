import HomePage, { homeMetadata } from '@/components/site/HomePage';

export function generateMetadata() {
  return homeMetadata('en');
}

export default function Page() {
  return <HomePage locale="en" />;
}
