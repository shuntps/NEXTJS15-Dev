import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import signupImage from "@/assets/signup-image.jpg";
import SignUpForm from "@/app/(auth)/signup/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[39rem] w-full max-w-[30rem] rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-muted-foreground">
              This place is under development.
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
