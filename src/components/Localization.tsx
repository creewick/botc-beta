import { TranslationProvider, type TranslationLoader } from "i18nano";
import { useParams } from "react-router-dom";
import localizations from "../locales/locales";

export default function Localized({ element, locales = [localizations.ui] }: 
    { element: React.ReactNode, locales?: Record<string, TranslationLoader>[] }) {
  const { lang } = useParams()

  return (
    <>
      {locales.reduce((acc, translations) => (
        <TranslationProvider translations={translations} language={lang || 'en'}>
          {acc}
        </TranslationProvider>
      ), element)}
    </>
  )
}