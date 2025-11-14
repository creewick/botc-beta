import type Character from "../types/characters/Character";
import type { Script } from "../types/scripts/Script";
import type { ScriptMeta } from "../types/scripts/ScriptMeta";
import characters from '../data/characters.json';

export const scripts = Object
  .entries(import.meta.glob('../data/scripts/*.json', { eager: true }))
  .map(([fileName, module]) => [
    fileName.split('/').pop()!.replace('.json', ''),
    (module as { default: Script }).default
  ] as [string, Script])

export function getScriptMeta(script: Script) {
  return script.find(item =>
    typeof item === 'object' &&
    'id' in item &&
    item.id === '_meta'
  ) as ScriptMeta
}

export function getCharacters(script: Script): Character[] {
  const meta = getScriptMeta(script)

  const result = script
    .filter(item => item !== meta)
    .map(item => typeof item === 'object'
      ? item as Character
      : characters.find(c => c.id === item.replaceAll('_', '')) as Character
     )

  return result
}

export function getJinxes(script: Script) {
  const characters = getCharacters(script)

  characters.map(c => c.jinxes)
}

export function twoColumnReorder(characters: Character[]) {
  const half = Math.ceil(characters.length / 2);
  
  return Array.from({ length: characters.length + characters.length % 2 }, (_, i) => {
    if (i % 2 === 0) return characters[i / 2];
    return characters[(i - 1) / 2 + half];
  }) as Character[];
}