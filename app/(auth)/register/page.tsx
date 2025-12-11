// app/(auth)/register/page.tsx
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  // Redirect authenticated users from register page
  const session = getSession();
  if (await session) {
    redirect("/");
  }

  return (
    <div>
      <AuthForm type="register" />
    </div>
  );
}
