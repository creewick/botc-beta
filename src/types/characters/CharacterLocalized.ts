import characters from '../../data/characters.json';

export type RoleId = typeof characters[number]['id'];

export default interface CharacterLocalized {
    name: string;
    ability?: string;
    summary?: string;
    flavor?: string;
    reminders?: string[];
    firstNightReminder?: string;
    otherNightReminder?: string;
    jinxes?: Record<RoleId, string>; 
}