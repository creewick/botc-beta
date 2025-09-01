import { useParams } from "react-router-dom";
import characters from '../data/characters/characters.json';
import ru from '../data/characters/characters.ru.json';
import en from '../data/characters/characters.en.json';
import Token from "../components/Token";
import { getIcon, getSuffix } from "../logic/getIcon";
import type Character from "../types/Character";
import type CharacterLocalized from "../types/CharacterLocalized";
import Button from "../components/Button";

export default function CharacterPage() {
    const { id } = useParams();
    const base = import.meta.env.BASE_URL;
    const character = characters.find(c => c.id === id) as Character;
    const localized = ru[id as keyof typeof ru] as CharacterLocalized;
    const english = en[id as keyof typeof en] as CharacterLocalized;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ marginRight: 8 }}>
                    <Token icon={getIcon(character)} />
                </span>
                <div style={{ flexGrow: 1, paddingLeft: 8 }}>
                    <h1 className="title" style={{ margin: '0 0 8px' }}>
                        {localized.name}
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Token icon={`${base}icons/${character.type}${getSuffix(character.type)}.webp`} size={50} title={character.type} />
                        <Token icon={`${base}images/${character.edition}.png`} size={50} />
                        <Button href={`https://wiki.bloodontheclocktower.com/${english.name}`}>
                            <Token icon={`${base}icons/preacher_g.webp`} size={50} title="Вики" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="content">
                <p>
                    {localized.ability}
                </p>
                <p className="note">
                    {localized.flavor}
                </p>
            </div>
        </>
    );
}