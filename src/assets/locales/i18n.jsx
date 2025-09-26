import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import lang_vi from './lang_vi'
import lang_en from './lang_en'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: lang_en,
    },
    vi: {
      translation: lang_vi,
    },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
