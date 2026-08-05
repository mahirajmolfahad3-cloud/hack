import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

type Provider = "openai" | "meta" | null;

interface SignupPageProps {
  searchParams: Promise<{ provider?: string }>;
}

const PROVIDER_CONFIG: Record<
  NonNullable<Provider>,
  { logo: string; alt: string; heading: string }
> = {
  openai: {
    logo: "/logos/chatgpt.png",
    alt: "ChatGPT logo",
    heading: "Signup using chatgpt account",
  },
  meta: {
    logo: "/logos/facebook.png",
    alt: "Facebook logo",
    heading: "Signup using facebook account",
  },
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const session = await getSession();
  if (session) redirect("/dashboard");

  const params = await searchParams;
  const providerParam = params.provider;
  const provider: Provider =
    providerParam === "openai" || providerParam === "meta" ? providerParam : null;
  const config = provider ? PROVIDER_CONFIG[provider] : null;

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#07070a]">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.45]"
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric wash, consistent with the rest of the app */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, rgba(124,58,237,0.14) 0%, rgba(7,7,10,0) 55%)",
        }}
      />

      {/* Layered readability gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07070a]/70 via-[#07070a]/80 to-[#07070a]" />

      {/* Filmic grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-16">
        <div className="signup-card w-full max-w-[400px] rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-10">
          {/* Logo */}
          <div className="signup-item mb-9 flex justify-center" style={{ animationDelay: "0.05s" }}>
            <Image
              src={config?.logo ?? "/logo.svg"}
              alt={config?.alt ?? "Logo"}
              width={config ? 44 : 38}
              height={config ? 44 : 38}
              priority
            />
          </div>

          {/* Heading */}
          <div className="signup-item mb-8 text-center" style={{ animationDelay: "0.12s" }}>
            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-white">
              {config?.heading ?? "Create your account"}
            </h1>
            <p className="mt-2 text-[13px] text-white/40">
              Start talking to your favorite characters in seconds.
            </p>
          </div>

          {/* Form */}
          <div className="signup-item" style={{ animationDelay: "0.18s" }}>
            <AuthForm mode="signup" />
          </div>

          {/* Bottom link */}
          <p className="signup-item mt-8 text-center text-[13px] text-white/40" style={{ animationDelay: "0.24s" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-white underline decoration-white/20 underline-offset-4 transition-colors hover:text-violet-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 pb-8">
        <div className="flex justify-center gap-6 text-xs text-white/35">
          <Link href="/terms" className="transition-colors hover:text-white/70">
            Terms of use
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-white/70">
            Privacy policy
          </Link>
        </div>
      </footer>

      {/* Scoped, dependency-free entrance animation */}
      <style>{`
        @keyframes signupIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .signup-card {
          animation: signupIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .signup-item {
          opacity: 0;
          animation: signupIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}
