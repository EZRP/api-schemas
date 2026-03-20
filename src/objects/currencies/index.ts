import { z } from "zod";
import { cadCurrency } from "./cad.js";
import { euroCurrency } from "./euro.js";
import { gbpCurrency } from "./gbp.js";
import { usdCurrency } from "./usd.js";

export type * from "./cad.js";
export type * from "./euro.js";
export type * from "./gbp.js";
export type * from "./usd.js";

export const CURRENCIES = [
  usdCurrency().decode({
    name: "US Dollar",
    code: "USD",
    symbol: "$",
    digits: 2,
  }),
  cadCurrency().decode({
    name: "Canadian Dollar",
    code: "CAD",
    symbol: "$",
    digits: 2,
  }),
  euroCurrency().decode({
    name: "Euro",
    code: "EUR",
    symbol: "€",
    digits: 2,
  }),
  gbpCurrency().decode({
    name: "British Pound",
    code: "GBP",
    symbol: "£",
    digits: 2,
  }),
] as const;

export type Currency = z.infer<typeof schema>;

const schema = z.union([
  cadCurrency(),
  euroCurrency(),
  gbpCurrency(),
  usdCurrency(),
]);

export const currency = () => schema;
