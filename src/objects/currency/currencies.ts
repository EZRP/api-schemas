import { makeCurrencySchema } from "./make-currency.js";

export const usdCurrency = makeCurrencySchema({
  name: "US Dollar",
  code: "USD",
  symbol: "$",
  digits: 2,
});
export const cadCurrency = makeCurrencySchema({
  name: "Canadian Dollar",
  code: "CAD",
  symbol: "$",
  digits: 2,
});
export const euroCurrency = makeCurrencySchema({
  name: "Euro",
  code: "EUR",
  symbol: "€",
  digits: 2,
});
export const gbpCurrency = makeCurrencySchema({
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
