import { useParams } from "react-router-dom";
import characters from '../data/characters.json';
import Token from "../components/Token";
import { getIcon, getSuffix } from "../logic/getIcon";
import type Character from "../types/characters/Character";
import english from '../locales/characters/characters.en.json';
import Button from "../components/Button";
import { Translation, useTranslation } from "i18nano";

export default function CharacterPage() {
  const { id } = useParams();
  const t = useTranslation();
  const character = characters.find(c => c.id === id) as Character;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ marginRight: 8 }}>
          <Token icon={getIcon(character)} />
        </span>
        <div style={{ flexGrow: 1, paddingLeft: 8, overflow: 'hidden' }}>
          <h1 className="title" style={{ margin: '0 0 8px' }}>
            <Translation path={`${id}.name`} />
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Token icon={`icons/${character.type}${getSuffix(character.type)}.webp`} size={50} title={t(`characterType.${character.type}`)} />
            <Token icon={`images/${character.edition}.webp`} size={50} />
            <Button href={`https://wiki.bloodontheclocktower.com/${english[id as keyof typeof english]?.name}`}>
              <Token icon={`icons/preacher_g.webp`} size={50} title="Вики" />
            </Button>
          </div>
        </div>
      </div>

      <div className="content">
        <p className="note">
          <Translation path={`${id}.flavor`} />
        </p>
        <h2 className="dumbledore">
          <Translation path="characterSection.ability" />
        </h2>
        <p>
          <Translation path={`${id}.ability`} />
        </p>
        { t(`${id}.summary`) && 
        <>
          <h2 className="dumbledore">
            <Translation path="characterSection.summary" />
          </h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            <Translation path={`${id}.summary`} />
          </p>
        </>}
      </div>
    </>
  );
}