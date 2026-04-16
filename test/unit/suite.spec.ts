import { suite } from "node:test";
import { objectsTests } from "./objects/index.js";
import { requestsTests } from "./requests/index.js";
import { responsesTests } from "./responses/index.js";
import { scalarsTests } from "./scalars/index.js";

suite("suite", () => {
  objectsTests();
  requestsTests();
  responsesTests();
  scalarsTests();
});
