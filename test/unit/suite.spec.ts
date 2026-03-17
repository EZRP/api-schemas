import { suite } from "node:test";
import { requestsTests } from "./requests/index.js";
import { responsesTests } from "./responses/index.js";
import { scalarsTests } from "./scalars/index.js";

suite("suite", () => {
  requestsTests();
  responsesTests();
  scalarsTests();
});
