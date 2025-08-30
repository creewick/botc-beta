import Button from "../components/Button";
import Token from "../components/Token";
import characters from '../data/characters/characters.json'

export default function Home() {
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

  return (
    <>
      <h1 className="title">Персонажи</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        { buttons.map((button) => renderButton(button.icon, button.size)) }
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', contentVisibility: 'auto' }}>
        { characters.map((character) => renderButton(`icons/${character.id}.webp`, 90, character.id)) }
      </div>
    </>
  );
}