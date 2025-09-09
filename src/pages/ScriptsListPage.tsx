import { Translation } from "i18nano";
import Button from "../components/Button";
import Token from "../components/Token";
import ScriptCard from "../components/ScriptCard";
import { getScriptMeta, scripts } from "../logic/scriptUtils";
import { useState } from "react";

export default function ScriptsListPage() {
  const [type, setType] = useState<string>();

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

  const filteredScripts = scripts.filter(([_, script]) => {
    const meta = getScriptMeta(script);

    return !type
      || meta.tags?.includes(type)
      || (type === 'custom' && !meta.tags?.includes('official') && !meta.tags?.includes('world_cup'))
      || (type === 'full' && !meta.tags?.includes('teen'));
  })

  const onSetType = (newType: string) => {
    if (type === newType)
      return setType(undefined);
    return setType(newType);
  }

  return (
    <>
      <div className="sticky gradient">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="title">
            {type ? <Translation path={`scriptType.${type}`} /> : <Translation path="home.scripts" />}
          </h1>
          {/* {renderButton('icons/investigator_g.webp', 40, 'search')} */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {buttons.map((button) => renderButton(button.icon, button.size, button.title, () => onSetType(button.title), type === button.title ? 'active' : 'not-active'))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
        {filteredScripts.map(([scriptId, script]) => <ScriptCard key={scriptId} script={script} scriptId={scriptId} />)}
      </div>
    </>
  )

}