export default {
    ui: {
        en: () => import('./ui/ui.en.json'),
        ru: () => import('./ui/ui.ru.json'),
    },
    characters: {
        en: () => import('./characters/characters.en.json'),
        ru: () => import('./characters/characters.ru.json'),
    },
    rules: {
        en: () => import('./rules/rules.en.json'),
        ru: () => import('./rules/rules.ru.json'),
    },
    glossary: {
        en: () => import('./glossary/glossary.en.json'),
        ru: () => import('./glossary/glossary.ru.json'),
    },
}