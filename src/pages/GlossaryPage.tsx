import { Translation, useTranslation } from "i18nano";
import glossary from '../locales/glossary/glossary.en.json';

export default function GlossaryPage() {
  const t = useTranslation();

  const keys = Object
    .keys(glossary)
    .sort((a, b) => t(`${a}.title`)
      .localeCompare(t(`${b}.title`)));
  
  return (
    <>
      <h1 className="title">
        <Translation path="home.glossary" />
      </h1>
      {
        keys.map((key) => (
          <div key={key} className="content dumbledore">
            <h2>{t(`${key}.title`)}</h2>
            <p>{t(`${key}.value`)}</p>
          </div>
        ))
      }
    </>
  )
}