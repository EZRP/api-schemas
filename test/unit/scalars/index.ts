import { suite } from "node:test";
import { environmentIdTests } from "./environment-id.js";
import { standardStringTests } from "./standard-string.js";

export function scalarsTests() {
  suite("scalars", () => {
    environmentIdTests();
    standardStringTests();
  });
}
