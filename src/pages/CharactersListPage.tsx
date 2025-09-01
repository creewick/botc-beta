import { useState, useEffect } from "react";
import Button from "../components/Button";
import Token from "../components/Token";
import characters from '../data/characters/characters.json'
import ru from '../data/characters/characters.ru.json'
import './CharactersListPage.css'
import { getIcon } from "../logic/getIcon";
import type Character from "../types/Character";
import type { CharacterType } from "../types/CharacterType";

export default function CharactersListPage() {
  const [loadedCharacters, setLoadedCharacters] = useState<Character[]>([]);
  const [type, setType] = useState<CharacterType>();
  const base = import.meta.env.BASE_URL;

  const renderButton = (icon: string, size: number, title: string, onClick?: () => void, className?: string, href?: string) => 
    <Button key={icon} className={className} onClick={onClick} href={href}>
      <Token icon={icon} size={size} title={size > 40 ? title : ''} />
    </Button>

  const buttons = [
    { icon: `${base}icons/townsfolk_g.webp`, size: 40, title: 'townsfolk', onClick: () => onSetType('townsfolk') },
    { icon: `${base}icons/outsider_g.webp`, size: 40, title: 'outsider', onClick: () => onSetType('outsider') },
    { icon: `${base}icons/minion_e.webp`, size: 40, title: 'minion', onClick: () => onSetType('minion') },
    { icon: `${base}icons/demon_e.webp`, size: 40, title: 'demon', onClick: () => onSetType('demon') },
    { icon: `${base}icons/traveller.webp`, size: 40, title: 'traveller', onClick: () => onSetType('traveller') },
    { icon: `${base}icons/fabled.webp`, size: 40, title: 'fabled', onClick: () => onSetType('fabled') },
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
    const filteredCharacters = characters
      .filter(c => c.edition !== 'special' && (type ? c.type === type : true))
      .sort((a, b) => (ru[a.id as keyof typeof ru].name ?? '')
        .localeCompare(ru[b.id as keyof typeof ru].name ?? ''));
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
  }, [type]);
  
  return (
    <>
      <div className="sticky gradient">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="title">Персонажи</h1>
          {renderButton(`${base}icons/investigator_g.webp`, 40, 'search')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          { buttons.map((button) => renderButton(button.icon, button.size, button.title, button.onClick, type === button.title ? 'active' : 'not-active')) }
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
        { loadedCharacters
            .map((character) => renderButton(getIcon(character), 90, ru[character.id as keyof typeof ru].name, undefined, undefined, `${base}characters/${character.id}`)) 
        }
      </div>
    </>
  );
}