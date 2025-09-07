import type { CharacterType } from "../characters/CharacterType";

export type ScriptCharacter = {
    id: string;
    name: string;
    image?: string | string[] | null;
    team: CharacterType;
    edition?: string;
    ability: string;
    flavor?: string;
    firstNight?: number;
    firstNightReminder?: string;
    otherNight?: number;
    otherNightReminder?: string;
    reminders?: string[];
    remindersGlobal?: string[];
    setup?: boolean;
    jinxes?: string[];
    special?: string[];
}

//
//   setup?: boolean;
//   /**
//    * Jinxes with other characters on this script
//    */
//   jinxes?: Jinx[];
//   /**
//    * Special app integration features for this character
//    */
//   special?: SpecialFeature[];
// }

// export default ScriptCharacter