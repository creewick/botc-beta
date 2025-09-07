import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Token from '../components/Token';
import './HomePage.css'
import { useTranslation } from 'i18nano';

export default function HomePage() {
  const { lang } = useParams();
  const t = useTranslation();
  const base = import.meta.env.BASE_URL;

  const renderButton = (icon: string, title: string, href: string, grayscale?: boolean) => 
    <Button href={`${base}${lang}/${href}`} key={href} disabled={grayscale}>
      <Token icon={icon} title={title} grayscale={grayscale} />
    </Button>

  const buttons = [
    { icon: 'icons/preacher_g.webp', title: t('home.rules'), href: 'rules' },
    { icon: 'icons/knight_g.webp', title: t('home.characters'), href: 'characters' },
    { icon: 'icons/steward_g.webp', title: t('home.scripts'), href: 'scripts' },
    { icon: 'icons/hellslibrarian.webp', title: t('home.glossary'), href: 'glossary' },
    { icon: 'icons/yaggababble_e.webp', title: t('home.events'), href: 'events', grayscale: true },
    { icon: 'icons/mezepheles_e.webp', title: t('home.sessions'), href: 'sessions', grayscale: true },
  ]

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img src={`${base}images/logo.${lang}.webp`} alt="logo" className="logo" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        { buttons.map((button) => renderButton(button.icon, button.title, button.href, button.grayscale)) }
      </div>
    </>
  );
}