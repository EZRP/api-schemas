import assert from "node:assert/strict";
import { suite, test } from "node:test";
import { expectTypeOf } from "expect-type";
import {
  CURRENCIES,
  currency,
} from "../../../../src/objects/currency/index.js";
import type {
  CadCurrency,
  Currency,
  EuroCurrency,
  GbpCurrency,
  UsdCurrency,
} from "../../../../src/objects/currency/types.js";
import type { BrandOf } from "../../lib.js";

export function currencyObjectTests() {
  suite("currency", () => {
    suite("types", () => {
      test("UsdCurrency should be branded with USD", () => {
        expectTypeOf<BrandOf<UsdCurrency>>().toEqualTypeOf<"USDCurrency">();
      });

      test("CadCurrency should be branded with CAD", () => {
        expectTypeOf<BrandOf<CadCurrency>>().toEqualTypeOf<"CADCurrency">();
      });

      test("EuroCurrency should be branded with EUR", () => {
        expectTypeOf<BrandOf<EuroCurrency>>().toEqualTypeOf<"EURCurrency">();
      });

      test("GbpCurrency should be branded with GBP", () => {
        expectTypeOf<BrandOf<GbpCurrency>>().toEqualTypeOf<"GBPCurrency">();
      });

      test("Currency should be the union of all currency types", () => {
        expectTypeOf<Currency>().toEqualTypeOf<
          UsdCurrency | CadCurrency | EuroCurrency | GbpCurrency
        >();
      });
    });

    suite("CURRENCIES", () => {
      test("should contain 4 entries", () => {
        assert.equal(CURRENCIES.length, 4);
      });

      test("should contain USD", () => {
        assert.ok(CURRENCIES.some((c) => c.code === "USD"));
      });

      test("should contain CAD", () => {
        assert.ok(CURRENCIES.some((c) => c.code === "CAD"));
      });

      test("should contain EUR", () => {
        assert.ok(CURRENCIES.some((c) => c.code === "EUR"));
      });

      test("should contain GBP", () => {
        assert.ok(CURRENCIES.some((c) => c.code === "GBP"));
      });
    });

    suite("currency() union schema", () => {
      test("should throw for an invalid currency object", () => {
        assert.throws(() =>
          currency().parse({
            name: "Canadian Dollarz",
            code: "CAD",
            symbol: "$",
            digits: 2,
          }),
        );
      });

      test("should throw for an unknown currency", () => {
        assert.throws(() =>
          currency().parse({
            name: "Yen",
            code: "JPY",
            symbol: "¥",
            digits: 0,
          }),
        );
      });

      test("should throw for extra fields", () => {
        assert.throws(() =>
          currency().parse({
            name: "US Dollar",
            code: "USD",
            symbol: "$",
            digits: 2,
            extra: true,
          }),
        );
      });

      test("should parse a valid USD object", () => {
        assert.doesNotThrow(() =>
          currency().parse({
            name: "US Dollar",
            code: "USD",
            symbol: "$",
            digits: 2,
          }),
        );
      });

      test("should parse a valid CAD object", () => {
        assert.doesNotThrow(() =>
          currency().parse({
            name: "Canadian Dollar",
            code: "CAD",
            symbol: "$",
            digits: 2,
          }),
        );
      });

      test("should parse a valid EUR object", () => {
        assert.doesNotThrow(() =>
          currency().parse({
            name: "Euro",
            code: "EUR",
            symbol: "€",
            digits: 2,
          }),
        );
      });

      test("should parse a valid GBP object", () => {
        assert.doesNotThrow(() =>
          currency().parse({
            name: "British Pound",
            code: "GBP",
            symbol: "£",
            digits: 2,
          }),
        );
      });
    });
  });
}
