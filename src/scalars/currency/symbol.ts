import { z } from "zod";
import { CURRENCIES, type Currency } from "../../objects/index.js";

export type CurrencySymbol = Currency["symbol"];

const validSymbols = new Set(CURRENCIES.map((c) => c.symbol as string));

const schema = z.custom<CurrencySymbol>(
  (v) => typeof v === "string" && validSymbols.has(v),
  "Invalid currency symbol",
);

export const currencySymbol = () => schema;
