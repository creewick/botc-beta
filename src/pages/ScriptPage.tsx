import { Translation, useTranslation } from "i18nano";
import { useParams } from "react-router-dom";
import { getCharacters, scripts, twoColumnReorder } from "../logic/scriptUtils";
import { BASIC_CHARACTER_TYPES, type CharacterType } from "../types/characters/CharacterType";
import type Character from "../types/characters/Character";
import { getIcon } from "../logic/getIcon";
import './ScriptPage.css';
import { useWindowSize } from "../logic/useWindowSize";
import Button from "../components/Button";
import { QRCodeCanvas } from "qrcode.react";
import Token from "../components/Token";

export default function ScriptPage() {
  const { id } = useParams();
  const { width } = useWindowSize();
  const t = useTranslation();
  const script = scripts.find(([scriptId]) => scriptId === id)![1];
  const scriptCharacters = getCharacters(script);
  const base = import.meta.env.BASE_URL;

  function renderNightOrder(firstNight: boolean) {
    const characters = firstNight
      ? scriptCharacters.filter(c => c.firstNightOrder && BASIC_CHARACTER_TYPES.includes(c.type ?? '')).sort((a, b) => a.firstNightOrder! - b.firstNightOrder!)
      : scriptCharacters.filter(c => c.otherNightOrder && BASIC_CHARACTER_TYPES.includes(c.type ?? '')).sort((a, b) => a.otherNightOrder! - b.otherNightOrder!);
    
    return (
      <div className={`${firstNight ? 'first-night' : 'other-night'} night-order`}>
        <h2>{firstNight ? 'Первая ночь' : 'Другая ночь'}</h2>
        {characters.map(renderNightOrderCharacter)}
      </div>
    )
  }

  function renderNightOrderCharacter(character: Character) {
    return (
      <div className="flex night-order-character" key={character.id}>
        <Button href={`../characters/${character.id}`}>
          <img className="icon" src={`${base}${getIcon(character)}`} width={60} />
        </Button>
        <h3 className={`${character.type} name`}>
          <Translation path={`${character.id}.name`} />
        </h3>
      </div>
    )
  }

  function renderCharacterType(type: CharacterType) {
    const characters = scriptCharacters.filter(c => c?.type === type);
    const orderedCharacters = width >= 616
      ? twoColumnReorder(characters)
      : characters;

    if (!characters.length) return null;

    return (
      <div key={type} className="flex characters-group">
        <h2 className={'alignment-name ' + type} >
          <Translation path={`characterType.${type}`} />
        </h2>
        <div className="flex flex-wrap gap-12">
          {orderedCharacters.map(renderCharacter)}
        </div>
      </div>
    )
  }

  function renderCharacter(character: Character) {
    if (!character) return <div className="character" />;
    const allText = t(`${character.id}.ability`).split('[');
    const ability = allText[0];
    const setup = allText[1] ? '[' + allText[1] : '';

    
    return (
      <div className="character" key={character.id}>
        <Button href={`../characters/${character.id}`}>
          <img className="icon" src={`${base}${getIcon(character)}`} width={95} />
        </Button>
        <div style={{ flex: '1 1 auto' }}>
          <h3 className={`${character.type} name`}>
            <Translation path={`${character.id}.name`} />
          </h3>
          <p className="ability">
            <span>{ability}</span>
            <span style={{ fontWeight: '600' }}>{setup}</span>
          </p>
        </div>
      </div>
    );
  }

  function renderJinxes() {
    return scriptCharacters
      .map(c => c.jinxes?.filter(j => scriptCharacters.find(c => c.id === j))
        .map(j => renderJinx(c, scriptCharacters.find(c => c.id === j)!)))
      .flat();
  }

  function renderJinx(character1: Character, character2: Character) {
    return (
      <div className="flex jinx" style={{ fontFamily: 'Roboto-Condensed', alignItems: 'center' }}>
        <Button href={`../characters/${character1.id}`}>
          <img className="icon" src={`${base}${getIcon(character1)}`} width={60} />
        </Button>
        <Button href={`../characters/${character2.id}`}>
          <img className="icon" src={`${base}${getIcon(character2)}`} width={60} />
        </Button>
        <Translation path={`${character1.id}.jinxes.${character2.id}`} />
      </div>
    )
  }

  function renderSetup() {
    return scriptCharacters
      .filter(c => c.setup)
      .map(c => renderNightOrderCharacter(c));
  }

  function renderFabled() {
    return scriptCharacters
      .filter(c => c.type === 'fabled')
      .map(c => renderNightOrderCharacter(c));
  }

  const renderButton = (icon: string, size: number, title: string, onClick?: () => void, className?: string, href?: string) =>
    <Button key={icon} className={className} onClick={onClick} href={href}>
      <Token icon={icon} size={size} title={size > 40 ? title : ''} />
    </Button>

  const buttons = [
    { icon: 'icons/seamstress_g.webp',title: t('script.copy'), onClick: () => navigator.clipboard.writeText(JSON.stringify(script)) },
    { icon: 'icons/steward_g.webp', title: t('script.print'), onClick: () => window.print() },
  ];

  return (
    <>
      <div className="print-hide flex buttons">
        {buttons.map((button) => renderButton(button.icon, 60, button.title, button.onClick))}
      </div>
      <QRCodeCanvas className="qr" value={window.location.href} size={70} bgColor="#0000" fgColor="#5c1f22" />
      <div className="content dumbledore flex flex-column">
        <div className="flex">
          <h2 className="alignment-name"> </h2>
          <h1 className="script-title" style={{ flexGrow: 1 }}>
            <Translation path={id ?? ''} />
          </h1>
        </div>
        {BASIC_CHARACTER_TYPES.map(renderCharacterType)}
        <span className="flex not-first-night" style={{justifyContent: 'center', alignItems: 'center', minHeight: 40 }}>
          * <Translation path="script.notFirstNight" />
        </span>
      </div>
      <div className="content dumbledore flex gap-12" style={{ paddingTop: 16 }}>
        {renderNightOrder(true)}
        <div className="jinx-list">
          <h1 className="script-title" style={{ textAlign: 'center' }}>
            <Translation path={id ?? ''} />
          </h1>
          <h2 style={{ textAlign: 'center' }}>
            <Translation path="script.fabled" />
          </h2>
          {renderFabled()}
          <h2 style={{ textAlign: 'center' }}>
            <Translation path="script.jinxes" />
          </h2>
          {renderJinxes()}
          <h2 style={{ textAlign: 'center' }}>
            <Translation path="script.setup" />
          </h2>
          {renderSetup()}
        </div>
        {renderNightOrder(false)}
      </div>
    </>
  )
}