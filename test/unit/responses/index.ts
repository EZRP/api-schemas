import { suite } from "node:test";
import { errorsTests } from "./errors.js";

export function responsesTests() {
  suite("responses", () => {
    errorsTests();
  });
}
