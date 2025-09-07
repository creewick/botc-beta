import type { ScriptCharacter } from "./ScriptCharacter";
import type { ScriptMeta } from "./ScriptMeta";
import type { OfficialCharacter } from "./OfficialCharacter";

type CharacterId = string;

export type Script = (
    ScriptMeta |
    ScriptCharacter |
    OfficialCharacter |
    CharacterId
)[]