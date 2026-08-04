import { notFound } from "next/navigation";
import { getCharacter } from "@/lib/characters";
import ChatInterface from "@/components/ChatInterface";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ character: string }>;
}) {
  const { character: slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  return <ChatInterface character={character} />;
}