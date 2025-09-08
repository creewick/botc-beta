import { Translation } from "i18nano";
import { useParams } from "react-router-dom";
import { getCharacters, scripts } from "../logic/scriptUtils";
import { CHARACTER_TYPES, type CharacterType } from "../types/characters/CharacterType";
import type Character from "../types/characters/Character";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getIcon } from "../logic/getIcon";
import './ScriptPage.css';

export default function ScriptPage() {
  const { id } = useParams();
  const script = scripts.find(([scriptId]) => scriptId === id)![1];
  const scriptCharacters = getCharacters(script);
  const base = import.meta.env.BASE_URL;

  function renderCharacterType(type: CharacterType) {
    const characters = scriptCharacters.filter(c => c?.type === type);

    if (!characters.length) return null;

    return (
      <div key={type} className="charactersGroup">
        <h2 className={'alignmentName ' + type} >
          <Translation path={`characterType.${type}`} />
        </h2>
        <div className="characters">
          {characters.map(renderCharacter)}
        </div>
      </div>
    )
  }

  function renderCharacter(character: Character) {
    return (
      <div className="character" key={character.id}>
        <LazyLoadImage className="icon" src={`${base}${getIcon(character)}`} width={80} />
        <div style={{ flex: '1 1 auto' }}>
          <h3 className={`${character.type} name`}>
            <Translation path={`${character.id}.name`} />
          </h3>
          <p className="ability">
            <Translation path={`${character.id}.ability`} />
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="title">
        <Translation path={id ?? ''} />
      </h1>
      <div className="content dumbledore">
        {CHARACTER_TYPES.map(renderCharacterType)}
      </div>
    </>
  )
}