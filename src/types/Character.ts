import type { CharacterType } from "./CharacterType";
import type { Edition } from "./Edition";

export default interface Character {
    id: string;
    edition?: Edition;
    type?: CharacterType;
    setup?: boolean;
    firstNightOrder?: number;
    otherNightOrder?: number;
    jinxes?: string[];
}