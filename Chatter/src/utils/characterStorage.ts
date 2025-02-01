export interface CharacterProps {
  name: string;
  traits: string;
  bio: string;
  image: string | null;
}

export const loadCharacter = (): CharacterProps | null => {
  const storedCharacter = localStorage.getItem("chatCharacter");
  return storedCharacter ? JSON.parse(storedCharacter) : null;
};

export const saveCharacter = (character: CharacterProps) => {
  localStorage.setItem("chatCharacter", JSON.stringify(character));
};
