import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacter } from "@/lib/characters";

export default async function CharacterPage({
  params,
}: {
  params: { character: string };
}) {
  const character = getCharacter(params.character);
  if (!character) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold text-gray-900">
            {character.name}
          </h1>
          <Link
            href="/dashboard"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Back to Characters
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={character.image}
              alt={character.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {character.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                This page is empty for now.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}