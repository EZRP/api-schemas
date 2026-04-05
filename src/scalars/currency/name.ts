import { z } from "zod";
import { CURRENCIES, type Currency } from "../../objects/index.js";

export type CurrencyName = Currency["name"];

const validNames = new Set(CURRENCIES.map((c) => c.name as string));

const schema = z.custom<CurrencyName>(
  (v) => typeof v === "string" && validNames.has(v),
  "Invalid currency name",
);

export const currencyName = () => schema;
