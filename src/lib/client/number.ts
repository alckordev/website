export function formatCompactNumber(
  value: number,
  locale = "en",
  minimumFractionDigits = 0
) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits,
    maximumFractionDigits: 1,
  }).format(value);
}
