import Link from "next/link";
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
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Character</h2>

        <div className="mt-8 space-y-4">
          {characters.map((character) => (
            <Link
              key={character.slug}
              href={`/dashboard/${character.slug}`}
              className="flex items-center gap-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={character.image}
                alt={character.name}
                className="h-20 w-20 rounded-xl object-cover"
              />
              <span className="text-xl font-semibold text-gray-900">
                {character.name}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}