export const EDITIONS = ['tb', 'bmr', 'snv', 'special', 'fabled'] as const;
export type Edition = typeof EDITIONS[number];