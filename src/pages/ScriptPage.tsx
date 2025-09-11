import { Translation, useTranslation } from "i18nano";
import { useParams } from "react-router-dom";
import { getCharacters, scripts, twoColumnReorder } from "../logic/scriptUtils";
import { CHARACTER_TYPES, type CharacterType } from "../types/characters/CharacterType";
import type Character from "../types/characters/Character";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getIcon } from "../logic/getIcon";
import './ScriptPage.css';
import { useWindowSize } from "../logic/useWindowSize";
import Button from "../components/Button";

export default function ScriptPage() {
  const { id } = useParams();
  const { width } = useWindowSize();
  const t = useTranslation();
  const script = scripts.find(([scriptId]) => scriptId === id)![1];
  const scriptCharacters = getCharacters(script);
  const base = import.meta.env.BASE_URL;

  function renderCharacterType(type: CharacterType) {
    const characters = scriptCharacters.filter(c => c?.type === type);
    const orderedCharacters = width >= 616
      ? twoColumnReorder(characters)
      : characters;

    if (!characters.length) return null;

    return (
      <div key={type} className="charactersGroup">
        <h2 className={'alignmentName ' + type} >
          <Translation path={`characterType.${type}`} />
        </h2>
        <div className="characters">
          {orderedCharacters.map(renderCharacter)}
        </div>
      </div>
    )
  }

  function renderCharacter(character: Character) {
    const allText = t(`${character.id}.ability`).split('[');
    const ability = allText[0];
    const setup = allText[1] ? '[' + allText[1] : '';

    
    return (
      <div className="character" key={character.id}>
        <Button href={`../characters/${character.id}`}>
        <LazyLoadImage className="icon" src={`${base}${getIcon(character)}`} width={80} />
        </Button>
        <div style={{ flex: '1 1 auto' }}>
          <h3 className={`${character.type} name`}>
            <Translation path={`${character.id}.name`} />
          </h3>
          <p className="ability">
            <span>{ability}</span>
            <span style={{ fontWeight: '600' }}>{setup}</span>
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
      <div className="content dumbledore flex">
        {CHARACTER_TYPES.map(renderCharacterType)}
      </div>
    </>
  )
}