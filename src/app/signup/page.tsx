import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

export default async function SignupPage() {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#0d0d0d]">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-[360px]">
          {/* Logo */}
          <div className="mb-12 flex justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={42}
              height={42}
              priority
            />
          </div>

          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-[32px] font-semibold tracking-tight text-white">
              Create your account
            </h1>
          </div>

          {/* Form */}
          <AuthForm mode="signup" />

          {/* Bottom link */}
          <p className="mt-8 text-center text-sm text-[#8e8ea0]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-white hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 pb-8">
        <div className="flex justify-center gap-6 text-xs text-[#8e8ea0]">
          <Link href="/terms" className="hover:text-white">
            Terms of use
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy policy
          </Link>
        </div>
      </footer>
    </main>
  );
}