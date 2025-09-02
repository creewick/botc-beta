import { TranslationProvider, type TranslationLoader } from "i18nano";
import { useParams } from "react-router-dom";
import localizations from "../locales/locales";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  locales?: Record<string, TranslationLoader>[];
}

export default function Localized({ children, locales = [] }: Props) {
  const { lang } = useParams()

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang || "en");
  }, [lang]);

  return (
    <>
      {[localizations.ui, ...locales].reduce((acc, translations) => (
        <TranslationProvider translations={translations} language={lang || 'en'}>
          {acc}
        </TranslationProvider>
      ), children)}
    </>
  );
}