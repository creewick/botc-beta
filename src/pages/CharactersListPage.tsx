import { useState, useEffect } from "react";
import Button from "../components/Button";
import Token from "../components/Token";
import characters from '../data/characters.json'
import './CharactersListPage.css'
import { getIcon } from "../logic/getIcon";
import type Character from "../types/Character";
import type { CharacterType } from "../types/CharacterType";
import { Translation, useTranslation } from "i18nano";

export default function CharactersListPage() {
  const t = useTranslation();
  const allCharacters = characters
    .sort((a, b) => t(`${a.id}.name`)
      .localeCompare(t(`${b.id}.name`)));
  const [loadedCharacters, setLoadedCharacters] = useState<Character[]>([]);
  const [type, setType] = useState<CharacterType>();

  const renderButton = (icon: string, size: number, title: string, onClick?: () => void, className?: string, href?: string) => 
    <Button key={icon} className={className} onClick={onClick} href={href}>
      <Token icon={icon} size={size} title={size > 40 ? title : ''} />
    </Button>

  const buttons = [
    { icon: 'icons/townsfolk_g.webp', size: 40, title: 'townsfolk', onClick: () => onSetType('townsfolk') },
    { icon: 'icons/outsider_g.webp', size: 40, title: 'outsider', onClick: () => onSetType('outsider') },
    { icon: 'icons/minion_e.webp', size: 40, title: 'minion', onClick: () => onSetType('minion') },
    { icon: 'icons/demon_e.webp', size: 40, title: 'demon', onClick: () => onSetType('demon') },
    { icon: 'icons/traveller.webp', size: 40, title: 'traveller', onClick: () => onSetType('traveller') },
    { icon: 'icons/fabled.webp', size: 40, title: 'fabled', onClick: () => onSetType('fabled') },
  ];

  const onSetType = (newType: CharacterType) => {
    if (type === newType) 
      return setType(undefined);
    return setType(newType);
  }

  useEffect(() => {
    let timerId: number | undefined;
    const batchSize = 1;
    let currentIndex = 0;
    const filteredCharacters = allCharacters
      .filter(c => c.edition !== 'special' 
        && (type ? c.type === type : true));
    setLoadedCharacters([]);

    const loadNextBatch = (typeValue?: string) => {
      if (typeValue !== type) return;
      const nextBatch = filteredCharacters
        .slice(currentIndex, currentIndex + batchSize) as Character[];

      currentIndex += batchSize;

      if (currentIndex < filteredCharacters.length && typeValue === type) {
        setLoadedCharacters(prev => [...prev, ...nextBatch]);
        timerId = window.setTimeout(() => loadNextBatch(typeValue), 0);
      }
    };

    loadNextBatch(type);
    return () => {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
    };
  }, [type, allCharacters]);
  
  return (
    <>
      <div className="sticky gradient">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="title">
            {type ? <Translation path={`characterType.${type}`} /> : <Translation path="home.characters" />}
          </h1>
          {renderButton('icons/investigator_g.webp', 40, 'search')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          { buttons.map((button) => renderButton(button.icon, button.size, button.title, button.onClick, type === button.title ? 'active' : 'not-active')) }
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
        { loadedCharacters
            .map((character) => renderButton(getIcon(character), 90, t(`${character.id}.name`), undefined, undefined, `./characters/${character.id}`)) 
        }
      </div>
    </>
  );
}