import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { apiSchemas, type CurrencyCode } from "../../../../src/index.js";
import {
  type BrandOf,
  expectParseFails,
  expectParseSucceeds,
} from "../../lib.js";

export function currencyCodeTests() {
  suite("code", () => {
    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<BrandOf<CurrencyCode>>().toEqualTypeOf<"CurrencyCode">();
      });
    });

    suite("schema", () => {
      const schema = apiSchemas.currencyCode();
      const expectFails = expectParseFails(schema);
      const expectSucceeds = expectParseSucceeds(schema);

      test("should fail for undefined", () => expectFails(undefined));
      test("should fail for a number", () => expectFails(42));
      test("should fail for an empty string", () => expectFails(""));
      test("should fail for an unknown code", () => expectFails("JPY"));
      test("should fail for lowercase code", () => expectFails("usd"));
      test("should fail for a non 3-character code", () => expectFails("US"));

      test("should parse USD", () => expectSucceeds("USD" as CurrencyCode));
      test("should parse CAD", () => expectSucceeds("CAD" as CurrencyCode));
      test("should parse EUR", () => expectSucceeds("EUR" as CurrencyCode));
      test("should parse GBP", () => expectSucceeds("GBP" as CurrencyCode));
    });
  });
}
