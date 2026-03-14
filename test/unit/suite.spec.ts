import { suite } from "node:test";
import { responsesTests } from "./responses/index.js";
import { scalarsTests } from "./scalars/index.js";

suite("suite", () => {
  responsesTests();
  scalarsTests();
});
