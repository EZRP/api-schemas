import { z } from "zod";

export function makeCurrency<
  const TName extends string,
  const TCode extends string,
  const TSymbol extends string,
  const TDigits extends number,
>(def: { name: TName; code: TCode; symbol: TSymbol; digits: TDigits }) {
  const schema = z
    .strictObject({
      name: z.literal(def.name).brand("CurrencyName"),
      code: z.literal(def.code).brand("CurrencyCode"),
      symbol: z.literal(def.symbol).brand("CurrencySymbol"),
      digits: z.literal(def.digits).brand("CurrencyDigits"),
    })
    .brand(def.code);

  return Object.assign(() => schema, {
    value: schema.parse(def) as z.infer<typeof schema>,
  });
}
