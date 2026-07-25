export function formatCurrency(amount: number, currency: string, locale = "en-US") {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: amount >= 1000 ? 0 : 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(0)}`;
  }
}

export function formatCompactCurrency(amount: number, symbol: string) {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}${symbol}${Math.abs(rounded).toLocaleString()}`;
}
