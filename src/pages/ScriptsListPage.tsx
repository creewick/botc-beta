import { Translation } from "i18nano";
import Button from "../components/Button";
import Token from "../components/Token";
import ScriptCard from "../components/ScriptCard";
import { scripts } from "../logic/scriptUtils";

export default function ScriptsListPage() {

  const renderButton = (icon: string, size: number, title: string, onClick?: () => void, className?: string, href?: string) =>
    <Button key={icon} className={className} onClick={onClick} href={href}>
      <Token icon={icon} size={size} title={size > 40 ? title : ''} />
    </Button>

  const buttons = [
    { icon: 'icons/preacher_g.webp', size: 40, title: 'official' },
    { icon: 'icons/bootlegger.webp', size: 40, title: 'custom' },
    { icon: 'icons/djinn.webp', size: 40, title: 'world_cup' },
    { icon: 'icons/pixie_e.webp', size: 40, title: 'teen' },
    { icon: 'icons/hatter_e.webp', size: 40, title: 'full' },
  ];

  return (
    <>
      <div className="sticky gradient">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="title">
          <Translation path="home.scripts" />

        </h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {buttons.map((button) => renderButton(button.icon, button.size, button.title))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
        {scripts.map(([scriptId, script]) => <ScriptCard key={scriptId} script={script} scriptId={scriptId} />)}
      </div>
    </>
  )

}