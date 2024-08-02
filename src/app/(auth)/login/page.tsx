import { Metadata } from "next";
import Link from "next/link";

import LoginForm from "@/app/(auth)/login/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[33rem] w-full max-w-[30rem] rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">
              This place is under development.
            </p>
          </div>

          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
