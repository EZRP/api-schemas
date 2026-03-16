import { suite } from "node:test";
import { patchTests } from "./patch.js";

export function requestsTests() {
  suite("requests", () => {
    patchTests();
  });
}
