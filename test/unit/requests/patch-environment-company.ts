import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import { schemas } from "../../../src/index.js";
import type { PatchEnvironmentCompany } from "../../../src/requests/patch-environment-company.js";
import { type BrandOf, expectParseSucceeds } from "../lib.js";

export function patchEnvironmentCompanyTests() {
  suite("PatchEnvironmentCompany", () => {
    suite("type", () => {
      test("should be branded", () => {
        expectTypeOf<BrandOf<PatchEnvironmentCompany>>().toEqualTypeOf<
          "PatchEnvironmentCompany" | "Patch"
        >;
      });
    });

    suite("schema", () => {
      const expectSucceeds = expectParseSucceeds(
        schemas.requests.patchEnvironmentCompany(),
      );

      test("should succeed with valid standard string", () => {
        expectSucceeds({
          replace: {
            doingBusinessAs: {
              current: "Google Inc.",
              next: "AI Inc.",
            },
          },
        });
      });
    });
  });
}
