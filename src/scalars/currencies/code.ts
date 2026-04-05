import { z } from "zod";
import { CURRENCIES, type Currency } from "../../objects/index.js";

export type CurrencyCode = Currency["code"];

const validCodes = new Set(CURRENCIES.map((c) => c.code as string));

const schema = z.custom<CurrencyCode>(
  (v) =>
    typeof v === "string" &&
    validCodes.has(v) &&
    v.length === 3 &&
    v.toUpperCase() === v,
  "Invalid currency code",
);

export const currencyCode = () => schema;
