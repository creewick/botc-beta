import Button from '../components/Button';
import Token from '../components/Token';
import './HomePage.css'

export default function HomePage() {
  const base = import.meta.env.BASE_URL;

  const renderButton = (icon: string, title: string, href: string) => 
    <Button href={href} key={href}>
      <Token icon={icon} title={title} />
    </Button>

  const buttons = [
    { icon: 'icons/preacher_g.webp', title: 'Правила', href: `${base}rules` },
    { icon: 'icons/knight_g.webp', title: 'Персонажи', href: `${base}characters` },
    { icon: 'icons/steward_g.webp', title: 'Сценарии', href: `${base}scripts` },
    { icon: 'icons/yaggababble_e.webp', title: 'Анонсы', href: `${base}events` },
    { icon: 'icons/mezepheles_e.webp', title: 'Партии', href: `${base}sessions` },
  ]

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img src="images/logo.ru.webp" alt="logo" className="logo" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        { buttons.map((button) => renderButton(button.icon, button.title, button.href)) }
      </div>
    </>
  );
}