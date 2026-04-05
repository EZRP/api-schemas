import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { apiSchemas, type CurrencyName } from "../../../../src/index.js";
import {
  type BrandOf,
  expectParseFails,
  expectParseSucceeds,
} from "../../lib.js";

export function currencyNameTests() {
  suite("name", () => {
    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<BrandOf<CurrencyName>>().toEqualTypeOf<"CurrencyName">();
      });
    });

    suite("schema", () => {
      const schema = apiSchemas.currencyName();
      const expectFails = expectParseFails(schema);
      const expectSucceeds = expectParseSucceeds(schema);

      test("should fail for undefined", () => expectFails(undefined));
      test("should fail for a number", () => expectFails(42));
      test("should fail for an empty string", () => expectFails(""));
      test("should fail for an unknown name", () => expectFails("Yen"));
      test("should fail for lowercase name", () => expectFails("us dollar"));

      test("should parse US Dollar", () =>
        expectSucceeds("US Dollar" as CurrencyName));
      test("should parse Canadian Dollar", () =>
        expectSucceeds("Canadian Dollar" as CurrencyName));
      test("should parse Euro", () => expectSucceeds("Euro" as CurrencyName));
      test("should parse British Pound", () =>
        expectSucceeds("British Pound" as CurrencyName));
    });
  });
}
