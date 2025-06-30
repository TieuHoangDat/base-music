import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

import en from "./en/translation.json";
import lo from "./lo/translation.json";
import vi from "./vi/translation.json";

const resources = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
  lo: {
    translation: lo,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "lo",
    resources,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
