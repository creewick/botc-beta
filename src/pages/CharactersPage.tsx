import { useState, useEffect } from "react";
import Button from "../components/Button";
import Token from "../components/Token";
import characters from '../data/characters/characters.json'

export default function Home() {
  const [visibleCharacters, setVisibleCharacters] = useState<typeof characters>([]);

  const renderButton = (icon: string, size: number, title?: string) => 
    <Button key={icon}>
      <Token icon={icon} size={size} title={title} />
    </Button>

  const buttons = [
    { icon: 'icons/townsfolk.webp', size: 40 },
    { icon: 'icons/outsider.webp', size: 40 },
    { icon: 'icons/minion.webp', size: 40 },
    { icon: 'icons/demon.webp', size: 40 },
    { icon: 'icons/traveller.webp', size: 40 },
    { icon: 'icons/fabled.webp', size: 40 },
  ];

  useEffect(() => {
    const batchSize = 1;
    let currentIndex = 0;

    const loadNextBatch = () => {
      const nextBatch = characters.slice(currentIndex, currentIndex + batchSize);
      setVisibleCharacters(prev => [...prev, ...nextBatch]);
      currentIndex += batchSize;


      if (currentIndex < characters.length) {
        setTimeout(loadNextBatch, 0);
      }
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
        { visibleCharacters.map((character) => renderButton(`icons/${character.id}.webp`, 90, character.id)) }
      </div>
    </>
  );
}