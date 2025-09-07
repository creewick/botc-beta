import type Character from "../types/characters/Character";
import type { CharacterType } from "../types/characters/CharacterType";

export function getSuffix(type?: CharacterType) {
  if (type === 'townsfolk') return '_g';
  if (type === 'outsider') return '_g';
  if (type === 'minion') return '_e';
  if (type === 'demon') return '_e';
  return '';
}

export function getIcon(character: Character) {
  if (!character) return '';
  return `icons/${character.id}${getSuffix(character.type)}.webp`;
}
