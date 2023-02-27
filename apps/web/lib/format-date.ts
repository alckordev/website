import { format, formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const _date = (date: string) =>
  format(parseISO(date), "d MMMM, yyyy", {
    locale: es,
  });

export const _dateAgo = (date: string) =>
  formatDistanceToNow(parseISO(date), {
    addSuffix: true,
    locale: es,
  });
