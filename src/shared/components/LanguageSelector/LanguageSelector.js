import { useTranslation } from "react-i18next";
import { languages } from "../../../i18n";
import Button from "../FormElements/Button/Button";
import "./LanguageSelector.css";

const LanguageSelector = props => {
  const { i18n } = useTranslation();
  return (
    <div
      className={`language-selector ${props.className ? props.className : ""}`}
    >
      {Object.keys(languages).map((lng, index) => {
        const currentLanguage = i18n.resolvedLanguage === lng;

        return (
          <Button
            key={index}
            htmlType="button"
            shape="round"
            size="small"
            className={`language-selector__button language-selector__button${
              currentLanguage ? "--selected" : "--no-selected"
            }`}
            text={languages[lng].nativeName}
            type={currentLanguage && "primary"}
            onClick={() => i18n.changeLanguage(lng)}
          />
        );
      })}
    </div>
  );
};

export default LanguageSelector;
