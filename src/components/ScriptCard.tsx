import { Translation } from "i18nano"
import locales from "../locales/locales"
import type { Script } from "../types/scripts/Script"
import Localized from "./Localized"
import { getCharacters, getScriptMeta } from "../logic/scriptUtils"
import './ScriptCard.css'
import Token from "./Token"
import { getIcon } from "../logic/getIcon"
import Button from "./Button"

interface ScriptCardProps {
  script: Script
  scriptId: string
}

function ScriptCardInternal({ script, scriptId }: ScriptCardProps) {
  const meta = getScriptMeta(script)
  const characters = getCharacters(script).reverse().filter(c => ['demon', 'minion'].includes(c?.type ?? ''))

  return (
    <Button className="scriptCard" href={`${window.location.href}/${scriptId}`}>
      <h3 className="dumbledore">
        <Translation path={scriptId} />
      </h3>
      <p>
        {meta.author}
      </p>
      <div className="scriptTokens">
        {characters.map((c, i) => <Token key={i} icon={getIcon(c)} size={40} />)}
      </div>
    </Button>
  )
}

export default function ScriptCard({ script, scriptId }: ScriptCardProps) {
  return (
    <Localized locales={[locales.scripts]}>
      <ScriptCardInternal script={script} scriptId={scriptId} />
    </Localized>
  )
}