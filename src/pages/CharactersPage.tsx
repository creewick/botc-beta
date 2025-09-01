import { useState, useEffect } from "react";
import Button from "../components/Button";
import Token from "../components/Token";
import characters from '../data/characters/characters.json'
import ru from '../data/characters/characters.ru.json'

export default function Home() {
  const [visibleCharacters, setVisibleCharacters] = useState<typeof characters>([]);

  const renderButton = (icon: string, size: number, title?: string) => 
    <Button>
      <Token icon={icon} size={size} title={title} />
    </Button>

  const buttons = [
    { icon: 'icons/townsfolk_g.webp', size: 40 },
    { icon: 'icons/outsider_g.webp', size: 40 },
    { icon: 'icons/minion_e.webp', size: 40 },
    { icon: 'icons/demon_e.webp', size: 40 },
    { icon: 'icons/traveller.webp', size: 40 },
    { icon: 'icons/fabled.webp', size: 40 },
  ];

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
    const batchSize = 1;
    let currentIndex = 0;

    const loadNextBatch = () => {
      const nextBatch = characters
        .filter(c => c.edition !== 'special')
        .slice(currentIndex, currentIndex + batchSize);
      setVisibleCharacters(prev => [...prev, ...nextBatch]);
      currentIndex += batchSize;

      if (currentIndex < characters.length)
        setTimeout(loadNextBatch, 0);
    };

    loadNextBatch();
  }, []);

  return (
    <>
      <h1 className="title">Персонажи</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        { buttons.map((button) => renderButton(button.icon, button.size)) }
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', contentVisibility: 'auto' }}>
        { visibleCharacters.map((character) => renderButton(getIcon(character), 90, ru[character.id as keyof typeof ru].name)) }
      </div>
    </>
  );
}