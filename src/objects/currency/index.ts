import { z } from "zod";
import { CURRENCY_SCHEMAS } from "./currencies.js";
import type { Currency } from "./types.js";

export * from "./currencies.js";
export type * from "./types.js";

export const CURRENCIES: ReadonlyArray<Currency> = CURRENCY_SCHEMAS.map(
  (f) => f.value,
);

const schema = z.union(CURRENCY_SCHEMAS.map((f) => f()));

export const currency = () => schema;
