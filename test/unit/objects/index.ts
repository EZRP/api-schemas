import { suite } from "node:test";
import { currencyObjectTests } from "./currency/index.js";

export function objectsTests() {
  suite("objects", () => {
    currencyObjectTests();
  });
}
