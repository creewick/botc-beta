export const CHARACTER_TYPES = ['townsfolk', 'outsider', 'minion', 'demon', 'traveller', 'fabled'] as const;
export const BASIC_CHARACTER_TYPES = ['townsfolk', 'outsider', 'minion', 'demon'] as const;
export type CharacterType = typeof CHARACTER_TYPES[number];