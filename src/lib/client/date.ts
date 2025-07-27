import { format, formatDistanceToNow, Locale } from "date-fns";
import { es, enUS } from "date-fns/locale";

type LocaleCode = "en" | "es"; // extend as you add languages

/** Map ISO locale code → date‑fns locale object */
const localeMap: Record<LocaleCode, Locale> = {
  en: enUS,
  es,
};

/** Pick date‑fns locale or fall back to English */
function toDateLocale(code: string): Locale {
  return localeMap[code as LocaleCode] ?? enUS;
}

/** yyyy‑MM‑dd | ISO string → “7 March 2025” */
export function formatDate(dateISO: string, locale: string) {
  return format(new Date(dateISO), "d MMMM, yyyy", {
    locale: toDateLocale(locale),
  });
}

/** yyyy‑MM‑dd | ISO string → “3 hours ago” */
export function formatRelativeDate(dateISO: string, locale: string) {
  return formatDistanceToNow(new Date(dateISO), {
    locale: toDateLocale(locale),
  });
}
