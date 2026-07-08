import en from "../../locales/en.json";
import es from "../../locales/es.json";
import pt from "../../locales/pt.json";
import fr from "../../locales/fr.json";
import it from "../../locales/it.json";

export type Locale = "en" | "es" | "pt" | "fr" | "it";

export type Messages = typeof en;

export const messages: Record<Locale, Messages> = {
  en: en as Messages,
  es: es as Messages,
  pt: pt as Messages,
  fr: fr as Messages,
  it: it as Messages,
};

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  it: "Italiano",
};
