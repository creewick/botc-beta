import type Character from "../types/Character";
import type { CharacterType } from "../types/CharacterType";

const base = import.meta.env.BASE_URL;

export function getSuffix(type?: CharacterType) {
  if (type === 'townsfolk') return '_g';
  if (type === 'outsider') return '_g';
  if (type === 'minion') return '_e';
  if (type === 'demon') return '_e';
  return '';
}

export function getIcon(character: Character) {
  return `${base}icons/${character.id}${getSuffix(character.type)}.webp`;
}
