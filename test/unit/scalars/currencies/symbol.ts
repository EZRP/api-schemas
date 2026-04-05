import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { apiSchemas, type CurrencySymbol } from "../../../../src/index.js";
import {
  type BrandOf,
  expectParseFails,
  expectParseSucceeds,
} from "../../lib.js";

export function currencySymbolTests() {
  suite("symbol", () => {
    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<
          BrandOf<CurrencySymbol>
        >().toEqualTypeOf<"CurrencySymbol">();
      });
    });

    suite("schema", () => {
      const schema = apiSchemas.currencySymbol();
      const expectFails = expectParseFails(schema);
      const expectSucceeds = expectParseSucceeds(schema);

      test("should fail for undefined", () => expectFails(undefined));
      test("should fail for a number", () => expectFails(42));
      test("should fail for an empty string", () => expectFails(""));
      test("should fail for an unknown symbol", () => expectFails("¥"));

      test("should parse $", () => expectSucceeds("$" as CurrencySymbol));
      test("should parse €", () => expectSucceeds("€" as CurrencySymbol));
      test("should parse £", () => expectSucceeds("£" as CurrencySymbol));
    });
  });
}
