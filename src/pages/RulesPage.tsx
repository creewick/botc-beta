import { Translation } from "i18nano";

export default function RulesPage() {

  return (
    <>
    <h1 className="title">
      <Translation path="home.rules" />
    </h1>
    <div className="content dumbledore">
      <h2>
        <Translation path="rules.title" />
      </h2>
      <p>
        <Translation path="rules.text.0" />
      </p>
      <p>
        <Translation path="rules.text.1" />
      </p>
      <p>
        <Translation path="rules.text.2" />
      </p>
      <p>
        <Translation path="rules.text.3" />
      </p>
      <ul className="dumbledore">
        <li>
          <Translation path="rules.text.4" />
        </li>
        <li>
          <Translation path="rules.text.5" />
        </li>
        <li>
          <Translation path="rules.text.6" />
        </li>
        <li>
          <Translation path="rules.text.7" />
        </li>
        <li>
          <Translation path="rules.text.8" />
        </li>
        <li>
          <Translation path="rules.text.9" />
        </li>
      </ul>
      <p>
        <Translation path="rules.text.10" />
      </p>
      <p>
        <Translation path="rules.text.11" />
      </p>
      <p>
        <Translation path="rules.text.12" />
      </p>
      <ol>
        <li>
          <Translation path="rules.text.13" />
        </li>
        <li>
          <Translation path="rules.text.14" />
        </li>
        <li>
          <Translation path="rules.text.15" />
        </li>
        <li>
          <Translation path="rules.text.16" />
        </li>
      </ol>
    </div>
    <div className="content dumbledore">
      <h2>
        <Translation path="nominations.title" />
      </h2>
      <p>
        <Translation path="nominations.text.0" />
      </p>
      <p>
        <Translation path="nominations.text.1" />
      </p>
      <p>
        <Translation path="nominations.text.2" />
      </p>
    </div>
    </>
  );
}