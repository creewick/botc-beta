import { TranslationProvider, type TranslationLoader } from "i18nano";
import { useParams } from "react-router-dom";
import localizations from "../locales/locales";
import { useEffect } from "react";

export default function Localized({ element, locales = [localizations.ui] }: 
    { element: React.ReactNode, locales?: Record<string, TranslationLoader>[] }) {
  const { lang } = useParams()

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang || "en");
  }, [lang]);

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