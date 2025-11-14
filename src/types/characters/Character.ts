import type { CharacterType } from "./CharacterType";
import type { Edition } from "../Edition";

export default interface Character {
    id: string;
    image?: string;
    ability?: string;
    edition?: Edition;
    team?: CharacterType;
    setup?: boolean;
    firstNightOrder?: number;
    otherNightOrder?: number;
    jinxes?: string[];
}