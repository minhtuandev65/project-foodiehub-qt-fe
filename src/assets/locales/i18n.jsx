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
  lng: "vi", // Ngôn ngữ mặc định
  fallbackLng: "vi",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
