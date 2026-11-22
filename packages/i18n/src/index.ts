/**
 * @haulix/i18n — Localization infrastructure
 *
 * Supports English (en) and Spanish (es).
 * Uses i18next + react-i18next.
 */

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { z } from "zod";

import en from "./locales/en";
import es from "./locales/es";

export type SupportedLocale = "en" | "es";

/** Zod schema for runtime locale validation */
export const localeSchema = z.enum(["en", "es"]);

export const resources = {
	en: { translation: en },
	es: { translation: es },
} as const;

export type TranslationKeys = typeof en;

let initialized = false;

/**
 * Initialize i18n. Call once per app at startup.
 */
export async function initI18n(locale: SupportedLocale = "en"): Promise<void> {
	if (initialized) return;
	initialized = true;
	await i18next.use(initReactI18next).init({
		lng: locale,
		fallbackLng: "en",
		resources,
		interpolation: {
			escapeValue: false,
		},
		compatibilityJSON: "v4",
	});
}

/**
 * Switch the active locale dynamically at runtime.
 */
export async function changeLocale(locale: SupportedLocale): Promise<void> {
	await i18next.changeLanguage(locale);
}

/**
 * Get the current active locale.
 */
export function getCurrentLocale(): SupportedLocale {
	return i18next.language?.startsWith("es") ? "es" : "en";
}

export { useTranslation } from "react-i18next";
export { default as enTranslations } from "./locales/en";
export { default as esTranslations } from "./locales/es";
export { i18next };
