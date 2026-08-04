import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

export default async function LoginPage() {
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
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-[32px] font-semibold tracking-tight text-white">
              Welcome back
            </h1>
          </div>

          {/* Form */}
          <AuthForm mode="login" />

          {/* Bottom link */}
          <p className="mt-8 text-center text-sm text-[#8e8ea0]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-white hover:underline"
            >
              Create one
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