import { suite } from "node:test";
import { currencyScalarsTests } from "./currencies/index.js";
import { environmentIdTests } from "./environment-id.js";
import { standardStringTests } from "./standard-string.js";

export function scalarsTests() {
  suite("scalars", () => {
    currencyScalarsTests();
    environmentIdTests();
    standardStringTests();
  });
}
