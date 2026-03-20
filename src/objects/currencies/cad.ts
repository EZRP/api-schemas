import { z } from "zod";

export type CadCurrency = z.infer<typeof schema>;

const schema = z.strictObject({
  name: z.literal("Canadian Dollar").brand("CurrencyName"),
  code: z.literal("CAD").brand("CurrencyCode"),
  symbol: z.literal("$").brand("CurrencySymbol"),
  digits: z.literal(2).brand("CurrencyDigits"),
});

export const cadCurrency = () => schema;
