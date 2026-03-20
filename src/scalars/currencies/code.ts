import { z } from "zod";
import { CURRENCIES, type Currency } from "../../objects/index.js";

export type CurrencyCode = Currency["code"];

const schema = z.custom<CurrencyCode>((v) =>
  CURRENCIES.find((c) => c.code === v),
);

export const currencyCode = () => schema;
