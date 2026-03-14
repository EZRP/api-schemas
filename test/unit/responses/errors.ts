import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { type ErrorsResponse, schemas } from "../../../src/index.js";
import { type BrandOf, expectParseFails, expectParseSucceeds } from "../lib.js";

export function errorsTests() {
  suite("errors", () => {
    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<
          BrandOf<ErrorsResponse>
        >().toEqualTypeOf<"ErrorsResponse">();
      });
    });

    suite("parser", () => {
      const expectFails = expectParseFails(schemas.responses.errors());
      const expectSucceeds = expectParseSucceeds(schemas.responses.errors());

      test("should throw for undefined", () => {
        expectFails(undefined);
      });

      test("should throw for number", () => {
        expectFails(42);
      });

      test("should throw for empty string", () => {
        expectFails("");
      });

      test("should throw for empty object", () => {
        expectFails({});
      });

      test("should fail with empty errors array", () => {
        expectFails({ errors: [] });
      });

      test("should fail with extra fields", () => {
        expectFails({
          errors: [{ name: "BigFuckUp", message: "fucked up big time" }],
          mistakes: "oopsy",
        });
      });

      test("should succeed with one error", () => {
        expectSucceeds({
          errors: [
            {
              name: "MrRoboto",
              message: "domo arrigato",
            },
          ],
        });
      });

      test("should succeed with 2 errors", () => {
        expectSucceeds({
          errors: [
            {
              name: "MrRoboto",
              message: "domo arrigato",
            },
            {
              name: "DoctorZed",
              message: "did you take your pills?",
            },
          ],
        });
      });
    });
  });
}
