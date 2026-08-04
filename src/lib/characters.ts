export type Character = {
  slug: string;
  name: string;
  image: string;
};

export const characters: Character[] = [
  { slug: "jimin", name: "Jimin", image: "/characters/jimin.png" },
  { slug: "satorugojo", name: "Satoru Gojo", image: "/characters/satorugojo.png" },
  { slug: "shinobu", name: "Shinobu", image: "/characters/shinobu.png" },
];

export function getCharacter(slug: string): Character | undefined {
  return characters.find((character) => character.slug === slug);
}