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

  const characterIds = script
    .filter(item => item !== meta)
    .map(item =>
      typeof item === 'object' &&
        'id' in item
        ? item.id
        : item)

  return characterIds.map(id => characters.find(c => c.id === id.replaceAll('_', '')) as Character)
}