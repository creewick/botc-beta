import { useState, useEffect } from "react";
import Button from "../components/Button";
import Token from "../components/Token";
import characters from '../data/characters/characters.json'
import ru from '../data/characters/characters.ru.json'
import './CharactersPage.css'

export default function Home() {
  const [loadedCharacters, setLoadedCharacters] = useState<typeof characters>([]);
  const [type, setType] = useState<string>();

  const renderButton = (icon: string, size: number, title: string, onClick?: () => void, className?: string) => 
    <Button key={title} className={className} onClick={onClick}>
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

  const onSetType = (newType: string) => {
    if (type === newType) 
      return setType(undefined);
    return setType(newType);
  }

  const getIcon = (character: any) => {
    if (character.edition === 'special') 
      return `icons/${character.id}.webp`;
    if (['townsfolk', 'outsider'].includes(character.type ?? ''))
      return `icons/${character.id}_g.webp`;
    if (['minion', 'demon'].includes(character.type ?? ''))
      return `icons/${character.id}_e.webp`;
    return `icons/${character.id}.webp`;
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
        .slice(currentIndex, currentIndex + batchSize);

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
          {renderButton('icons/investigator_g.webp', 40, 'search')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          { buttons.map((button) => renderButton(button.icon, button.size, button.title, button.onClick, type === button.title ? 'active' : undefined)) }
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
        { loadedCharacters
            .map((character) => renderButton(getIcon(character), 90, ru[character.id as keyof typeof ru].name)) 
        }
      </div>
    </>
  );
}