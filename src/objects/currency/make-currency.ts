import assert from "node:assert/strict";
import { z } from "zod";

export function makeCurrencySchema<
  const TName extends string,
  const TCode extends string,
  const TSymbol extends string,
  const TDigits extends number,
>(def: { name: TName; code: TCode; symbol: TSymbol; digits: TDigits }) {
  assert(def.code.length === 3, "Currency code must be exactly 3 characters");
  assert(
    def.digits >= 0 && def.digits <= 6,
    "Currency digits must be between 0 and 6",
  );

  const brand =
    `${def.code.toUpperCase()}Currency` as `${Uppercase<TCode>}Currency`;

  const schema = z
    .strictObject({
      name: z.literal(def.name).brand("CurrencyName"),
      code: z.literal(def.code.toUpperCase()).brand("CurrencyCode"),
      symbol: z.literal(def.symbol).brand("CurrencySymbol"),
      digits: z.literal(def.digits).brand("CurrencyDigits"),
    })
    //
    .brand(brand);

  return Object.assign(() => schema, {
    value: schema.parse(def) as z.infer<typeof schema>,
  });
}
