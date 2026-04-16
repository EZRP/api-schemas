import { z } from "zod";
import { CURRENCIES, type Currency } from "../../objects/index.js";

export type CurrencyDigits = Currency["digits"];

const validDigits = new Set<number>(CURRENCIES.map((c) => c.digits as number));

const schema = z.custom<CurrencyDigits>(
  (v) => typeof v === "number" && validDigits.has(v),
  "Invalid currency digits",
);

export const currencyDigits = () => schema;
