import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translator/en/en.json";
import es from "../translator/es/es.json";

const resources = {
  en: {
    translation: en,
  },

  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    ns: "translation",
    defaultNS: "translation",
    react: {
      useSuspense: true,
    },
  });

export default i18n;
