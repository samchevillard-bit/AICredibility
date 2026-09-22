import { getSession } from '@/lib/auth';
import PageHeader from '@/components/admin/PageHeader';
import PasswordForm from '@/components/admin/PasswordForm';

export default async function AccountPage() {
  const session = await getSession();
  return (
    <>
      <PageHeader title="Mon compte" description={`Connecté en tant que ${session?.email}.`} />
      <PasswordForm />
    </>
  );
}
