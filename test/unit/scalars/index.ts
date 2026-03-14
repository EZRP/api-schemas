import { suite } from "node:test";
import { environmentIdTests } from "./environment-id.js";

export function scalarsTests() {
  suite("scalars", () => {
    environmentIdTests();
  });
}
