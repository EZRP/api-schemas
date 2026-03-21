import { z } from "zod";

export type GbpCurrency = z.infer<typeof schema>;

const schema = z.strictObject({
  name: z.literal("British Pound").brand("CurrencyName"),
  code: z.literal("GBP").brand("CurrencyCode"),
  symbol: z.literal("£").brand("CurrencySymbol"),
  digits: z.literal(2).brand("CurrencyDigits"),
});

export const gbpCurrency = () => schema;
