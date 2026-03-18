import { randomUUID } from "node:crypto";
import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { apiSchemas } from "../../../src/index.js";
import type { EnvironmentId } from "../../../src/scalars/environment-id.js";
import type { Uuid } from "../../../src/scalars/uuid.js";
import { type BrandOf, expectParseFails, expectParseSucceeds } from "../lib.js";

export function environmentIdTests() {
  suite("EnvironmentId", () => {
    suite("type", () => {
      test("should extend as Uuid", () => {
        expectTypeOf<EnvironmentId>().toExtend<Uuid>();
      });

      test("should be branded", () => {
        expectTypeOf<BrandOf<EnvironmentId>>().toEqualTypeOf<
          "EnvironmentId" | "Uuid"
        >();
      });
    });

    suite("schema", () => {
      const expectFails = expectParseFails(apiSchemas.environmentId());
      const expectSucceeds = expectParseSucceeds(apiSchemas.environmentId());

      test("should throw for undefined", () => {
        expectFails(undefined);
      });

      test("should throw for number", () => {
        expectFails(42);
      });

      test("should throw for empty string", () => {
        expectFails("");
      });

      test("should work for valid UUIDs", () => {
        expectSucceeds(randomUUID());
      });
    });
  });
}
