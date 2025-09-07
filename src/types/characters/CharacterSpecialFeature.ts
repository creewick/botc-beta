import type { CharacterType } from "../scripts/ScriptType";

export type ScriptSpecialFeature = {
    type: 'selection' | 'ability' | 'signal' | 'vote' | 'reveal';
    name: 'grimoire' | 'pointing' | 'ghost-votes' | 'distribute-roles' | 'bag-disabled' | 'bag-duplicate' | 'multiplier' | 'hidden' | 'replace-character' | 'player' | 'card';
    value?: string | number;
    time?: 'pregame' | 'day' | 'night' | 'firstNight' | 'firstDay' | 'otherNight' | 'otherDay';
    global?: Exclude<CharacterType, 'fabled'>;
}
