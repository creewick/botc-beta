import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Token from '../components/Token';
import './HomePage.css'
import { useTranslation } from 'i18nano';

export default function HomePage() {
  const { lang } = useParams();
  const t = useTranslation();
  const base = import.meta.env.BASE_URL;

  const renderButton = (icon: string, title: string, href: string) => 
    <Button href={href} key={href}>
      <Token icon={icon} title={title} />
    </Button>

  const buttons = [
    { icon: 'icons/preacher_g.webp', title: t('home.rules'), href: `${base}${lang}/rules` },
    { icon: 'icons/knight_g.webp', title: t('home.characters'), href: `${base}${lang}/characters` },
    { icon: 'icons/steward_g.webp', title: t('home.scripts'), href: `${base}${lang}/scripts` },
    { icon: 'icons/spy_e.webp', title: 'Instagram', href: 'http://instagram.com/clocktower_almaty/' },
    { icon: 'icons/mezepheles_e.webp', title: t('home.sessions'), href: 'https://clocktracker.app/@creewick?view=games' },
  ]

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <img src={`${base}images/logo.${lang}.webp`} alt="logo" className="logo" />
      </div>
      <div className="content" style={{ margin: '0 0 24px 0' }}>
        <p>Каждую пятницу 19:00<br/>
        Алматы, Биокомбинатская 9, MyRoom</p>
        <p>Запись через <a href="https://t.me/creewick">Telegram</a></p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        { buttons.map((button) => renderButton(button.icon, button.title, button.href)) }
      </div>
    </>
  );
}