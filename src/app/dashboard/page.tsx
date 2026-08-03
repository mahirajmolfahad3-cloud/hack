import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
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
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back 👋
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            You&apos;re signed in as{" "}
            <span className="font-medium text-gray-900">{session.email}</span>
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                User ID
              </p>
              <p className="mt-1 truncate text-sm font-mono text-gray-900">
                {session.userId}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Email
              </p>
              <p className="mt-1 text-sm text-gray-900">{session.email}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Status
              </p>
              <p className="mt-1 text-sm text-green-600">Authenticated</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
