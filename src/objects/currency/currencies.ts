import { makeCurrency } from "./make-currency.js";

export const usdCurrency = makeCurrency({
  name: "US Dollar",
  code: "USD",
  symbol: "$",
  digits: 2,
});
export const cadCurrency = makeCurrency({
  name: "Canadian Dollar",
  code: "CAD",
  symbol: "$",
  digits: 2,
});
export const euroCurrency = makeCurrency({
  name: "Euro",
  code: "EUR",
  symbol: "€",
  digits: 2,
});
export const gbpCurrency = makeCurrency({
  name: "British Pound",
  code: "GBP",
  symbol: "£",
  digits: 2,
});

export const CURRENCY_SCHEMAS = [
  usdCurrency,
  cadCurrency,
  euroCurrency,
  gbpCurrency,
] as const;
