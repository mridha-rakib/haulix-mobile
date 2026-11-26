import {
  changeLocale,
  getCurrentLocale,
  i18next,
  initI18n,
  type SupportedLocale,
  useTranslation,
} from "@haulix/i18n";
import { driverTranslationsEn } from "./driverEn";
import { driverTranslationsEs } from "./driverEs";

let registered = false;

export async function initDriverI18n(locale: SupportedLocale = "en"): Promise<void> {
  await initI18n(locale);
  if (!registered) {
    i18next.addResourceBundle("en", "translation", driverTranslationsEn, true, true);
    i18next.addResourceBundle("es", "translation", driverTranslationsEs, true, true);
    registered = true;
  }
}

export function useDriverTranslation() {
  const { t, i18n } = useTranslation();
  const currentLocale = (i18n.language?.startsWith("es") ? "es" : "en") as SupportedLocale;

  const toggleLanguage = async () => {
    const nextLocale: SupportedLocale = currentLocale === "en" ? "es" : "en";
    await changeLocale(nextLocale);
    return nextLocale;
  };

  const setLanguage = async (locale: SupportedLocale) => {
    await changeLocale(locale);
  };

  return {
    t,
    currentLocale,
    toggleLanguage,
    setLanguage,
  };
}

export { changeLocale, getCurrentLocale };
