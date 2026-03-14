import assert from "node:assert/strict";
import type { z } from "zod";

export type BrandOf<T> = T extends z.$brand<infer B> ? B : T;

export function expectParseFails(schema: z.ZodType) {
  return (input: unknown) => assert.throws(() => schema.parse(input));
}

export function expectParseSucceeds<S extends z.ZodType>(schema: S) {
  return (input: z.input<S>, expected?: z.output<S>) =>
    assert.deepEqual(schema.parse(input), expected ?? input);
}
