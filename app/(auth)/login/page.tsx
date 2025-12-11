import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <AuthForm type="login" />
    </div>
  );
}
