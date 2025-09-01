export default {
    ui: {
        en: () => import('./ui/ui.en.json'),
        ru: () => import('./ui/ui.ru.json'),
    },
    characters: {
        en: () => import('./characters/characters.en.json'),
        ru: () => import('./characters/characters.ru.json'),
    }
}