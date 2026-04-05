import { suite } from "node:test";
import { currencyCodeTests } from "./code.js";
import { currencyDigitsTests } from "./digits.js";
import { currencyNameTests } from "./name.js";
import { currencySymbolTests } from "./symbol.js";

export function currencyScalarsTests() {
  suite("currencies", () => {
    currencyCodeTests();
    currencyDigitsTests();
    currencyNameTests();
    currencySymbolTests();
  });
}
