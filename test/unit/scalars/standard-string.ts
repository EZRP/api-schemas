import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { type StandardString, schemas } from "../../../src/index.js";
import { type BrandOf, expectParseFails, expectParseSucceeds } from "../lib.js";

export function standardStringTests() {
  suite("StandardString", () => {
    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<
          BrandOf<StandardString>
        >().toEqualTypeOf<"StandardString">();
      });
    });

    suite("schema", () => {
      const expectFails = expectParseFails(schemas.standardString());
      const expectSucceeds = expectParseSucceeds(schemas.standardString());

      test("should throw for undefined", () => {
        expectFails(undefined);
      });

      test("should throw for number", () => {
        expectFails(42);
      });

      test("should throw for empty string", () => {
        expectFails("");
      });

      test("should throw for string of 257 characters", () => {
        expectFails("".repeat(257));
      });

      test("should work for single character string", () => {
        expectSucceeds("a");
      });

      test("should work for regular string", () => {
        expectSucceeds(
          "AI is not going to revolutionize the world in any meaningful way mfk",
        );
      });

      test("should work with a 256 characters string", () => {
        expectSucceeds("a".repeat(256));
      });
    });
  });
}
