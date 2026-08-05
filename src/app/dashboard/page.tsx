import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { characters } from "@/lib/characters";
import LogoutButton from "@/components/LogoutButton";

// This page is also guarded by src/middleware.ts, which redirects
// unauthenticated requests before this component even renders. The
// getSession() check below is a second, defense-in-depth guard for
// direct server-side rendering.
export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070a] text-white">
      {/* Ambient brand wash, consistent with the rest of the app */}
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, rgba(124,58,237,0.10) 0%, rgba(7,7,10,0) 60%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.08] bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
              Persona
            </p>
            <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-white">
              Dashboard
            </h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-wide text-white/60 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          {characters.length} characters available
        </p>

        <h2 className="text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
          Choose your character.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-7 text-white/50">
          Every conversation starts fresh. Pick a personality and continue
          right where you left off.
        </p>

        {/* Character grid — portrait cards, image-led like a character roster */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {characters.map((character, i) => (
            <a
              key={character.slug}
              href={`/dashboard/${character.slug}`}
              style={{ ["--i" as string]: i }}
              className="dashboard-card group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/40 to-fuchsia-500/20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={character.image}
                alt={character.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />

              {/* Legibility scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              {/* Online-style status dot, echoes the chat screen */}
              <span className="absolute right-3 top-3 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-white">
                  {character.name}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Start chatting
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 -translate-x-0.5 transition-transform duration-300 group-hover:translate-x-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Scoped, dependency-free entrance animation for the grid */}
      <style>{`
        @keyframes dashboardCardIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-card {
          opacity: 0;
          animation: dashboardCardIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--i) * 60ms);
        }
      `}</style>
    </div>
  );
}