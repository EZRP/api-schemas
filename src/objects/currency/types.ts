import type { z } from "zod";
import type {
  cadCurrency,
  euroCurrency,
  gbpCurrency,
  usdCurrency,
} from "./currencies.js";

export type UsdCurrency = z.infer<ReturnType<typeof usdCurrency>>;
export type CadCurrency = z.infer<ReturnType<typeof cadCurrency>>;
export type EuroCurrency = z.infer<ReturnType<typeof euroCurrency>>;
export type GbpCurrency = z.infer<ReturnType<typeof gbpCurrency>>;

export type Currency = UsdCurrency | CadCurrency | EuroCurrency | GbpCurrency;
