import { z } from "zod";

export type UsdCurrency = z.infer<typeof schema>;

const schema = z
  .strictObject({
    name: z.literal("US Dollar").brand("CurrencyName"),
    code: z.literal("USD").brand("CurrencyCode"),
    symbol: z.literal("$").brand("CurrencySymbol"),
    digits: z.literal(2).brand("CurrencyDigits"),
  })
  .brand("USD_CURRENCY");

export const usdCurrency = () => schema;
