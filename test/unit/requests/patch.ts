import assert from "node:assert/strict";
import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { z } from "zod";
import { type Patch, patch } from "../../../src/requests/patch.js";
import { type BrandOf, expectParseFails, expectParseSucceeds } from "../lib.js";

export function patchTests() {
  suite("Patch", () => {
    const add = {
      list: z.union([z.boolean(), z.number()]),
    };
    const remove = {
      list: z.union([z.boolean(), z.number()]),
    };
    const replace = {
      left: z.number(),
      right: z.string(),
    };
    const unset = {
      left: z.number(),
      right: z.string(),
      middle: z.string(),
    };

    type Add = typeof add;
    type Remove = typeof remove;
    type Replace = typeof replace;
    type Unset = typeof unset;

    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<BrandOf<Patch<{ replace: Replace; unset: Unset }>>>()
          .toEqualTypeOf<"Patch">;
      });

      test("should only include add if only add is present", () => {
        expectTypeOf<Patch<{ add: Add }>>().toEqualTypeOf<
          {
            add?: { list?: boolean | number };
          } & z.$brand<"Patch">
        >();
      });

      test("should only include remove if only remove is present", () => {
        expectTypeOf<Patch<{ remove: Remove }>>().toEqualTypeOf<
          {
            remove?: { list?: boolean | number };
          } & z.$brand<"Patch">
        >();
      });

      test("should only include replace if only replace is present", () => {
        expectTypeOf<Patch<{ replace: Replace }>>().toEqualTypeOf<
          {
            replace?: {
              left?: { current: number; next: number };
              right?: { current: string; next: string };
            };
          } & z.$brand<"Patch">
        >();
      });

      test("should only include unset if only unset is present", () => {
        expectTypeOf<Patch<{ unset: Unset }>>().toEqualTypeOf<
          {
            unset?: {
              left?: {
                current: number;
              };
              right?: {
                current: string;
              };
              middle?: {
                current: string;
              };
            };
          } & z.$brand<"Patch">
        >();
      });
    });

    suite("factory", () => {
      test("should throw when no rules are provided", () => {
        assert.throws(() => patch({}));
      });
    });

    suite("schema", () => {
      const schema = patch({ add, remove, replace, unset });
      const expectFails = expectParseFails(schema);
      const expectSucceeds = expectParseSucceeds(schema);

      test("should fail for undefined", () => {
        expectFails(undefined);
      });

      test("should fail when no updates are provided", () => {
        expectFails({});
      });

      test("should fail for invalid add field", () => {
        expectFails({ add: { set: 42 } });
      });

      test("should fail for invalid add field value", () => {
        expectFails({ add: { list: "42" } });
      });

      test("should fail for invalid remove field", () => {
        expectFails({ remove: { set: 42 } });
      });

      test("should fail for invalid remove field value", () => {
        expectFails({ remove: { list: "42" } });
      });

      test("should fail for invalid replace field", () => {
        expectFails({ replace: { middle: { current: "bull", next: "shit" } } });
      });

      test("should fail for invalid replace field value", () => {
        expectFails({ replace: { left: { current: "42", next: "43" } } });
      });

      test("should fail for invalid unset field", () => {
        expectFails({ unset: { "smack-that": { current: 0 } } });
      });

      test("should fail for invalid unset field value", () => {
        expectFails({ unset: { left: { current: "toto" } } });
      });

      test("should succeed with valid add field value", () => {
        expectSucceeds({ add: { list: 42 } });
      });

      test("should succeed with valid remove field value", () => {
        expectSucceeds({ remove: { list: 42 } });
      });

      test("should succeed with valid replace field", () => {
        expectSucceeds({ replace: { left: { current: 42, next: 43 } } });
      });

      test("should succeed with valid unset field", () => {
        expectSucceeds({ unset: { middle: { current: "fuck-you" } } });
      });
    });
  });
}
