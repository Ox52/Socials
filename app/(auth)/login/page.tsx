


import { AuthForm } from '@/components/auth-form';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  // Redirect authenticated users from login page
  const session = getSession();
  if (session) {
    redirect('/');
  }

  return (
    <div>
      <AuthForm type="login" />
    </div>
  );
}