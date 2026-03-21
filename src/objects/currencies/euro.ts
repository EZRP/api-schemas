import { z } from "zod";

export type EuroCurrency = z.infer<typeof schema>;

const schema = z.strictObject({
  name: z.literal("Euro").brand("CurrencyName"),
  code: z.literal("EUR").brand("CurrencyCode"),
  symbol: z.literal("€").brand("CurrencySymbol"),
  digits: z.literal(2).brand("CurrencyDigits"),
});

export const euroCurrency = () => schema;
