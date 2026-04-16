import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { apiSchemas, type CurrencyDigits } from "../../../../src/index.js";
import {
  type BrandOf,
  expectParseFails,
  expectParseSucceeds,
} from "../../lib.js";

export function currencyDigitsTests() {
  suite("digits", () => {
    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<
          BrandOf<CurrencyDigits>
        >().toEqualTypeOf<"CurrencyDigits">();
      });
    });

    suite("schema", () => {
      const schema = apiSchemas.currencyDigits();
      const expectFails = expectParseFails(schema);
      const expectSucceeds = expectParseSucceeds(schema);

      test("should fail for undefined", () => expectFails(undefined));
      test("should fail for a string", () => expectFails("2"));
      test("should fail for a number not in the valid currency sets", () =>
        expectFails(3));
      test("should fail for a non-integer", () => expectFails(2.5));
      test("should fail for a number greater than 5", () => expectFails(6));
      test("should fail for zero", () => expectFails(0));
      test("should fail for a negative number", () => expectFails(-1));

      test("should parse 2", () => expectSucceeds(2 as CurrencyDigits));
    });
  });
}
