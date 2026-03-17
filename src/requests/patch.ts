import assert from "node:assert/strict";
import { mapValues } from "es-toolkit";
import { isEmpty } from "es-toolkit/compat";
import { z } from "zod";

export type Patch<Opts extends PatchRules> = z.infer<
  ReturnType<typeof patch<Opts>>
>;

/**
 * A type describing the rules a PATCH request body must follow.
 */
export type PatchRules = {
  /**
   * Specify which fields support additions, and how to validate
   * their values.
   *
   * An addition is appending to a list, or inserting on a set.
   *
   * The server implementation may insert a check to verify
   * the item does not already exist in the collection.
   */
  add?: FieldsSchemas;
  /**
   * Specify which fields support removals, and how to validate
   * their values.
   *
   * A removal is removing an item from a list or a set.
   *
   * The server implementation may insert a check to verify
   * the item already does exist in the collection.
   */
  remove?: FieldsSchemas;
  /**
   * Specify which fields support being replaced directly, and how
   * to validate their values.
   *
   * The server implementation requires that the current value
   * be provided as part of the operation, to validate the
   * state of that field hasn't changed.
   */
  replace?: FieldsSchemas;
  /**
   * Specify which fields support being unset directly.
   *
   * Unsetting a field is basically deleting the attribute from
   * the object.
   *
   * The server implementation requires that the current value
   * be provided as part of the operation, to validate the
   * state of that field hasn't changed.
   */
  unset?: FieldsSchemas;
};

/**
 * This schema factory creates a patch schema based on the provided
 * rules.
 *
 * The schema also provides universally present rules, such as enforcing
 * that at least one patch operation is provided (an empty object fails
 * validation).
 *
 * @param rules - The patch rules to codify into a schema.
 *
 * @returns A schema that will validate inputs according to the rules
 * specified, plus some additional universally present rules.
 *
 * @see PatchRules
 */
export function patch<Rules extends PatchRules>(rules: Rules) {
  const { add, remove, replace, unset } = rules;

  assert(
    add != null || remove != null || replace != null || unset != null,
    "must provide at least one patch update rule",
  );

  const shape: Record<string, unknown> = {};

  if (add != null && !isEmpty(add)) {
    shape.add = addSchema(add);
  }

  if (remove != null && !isEmpty(remove)) {
    shape.remove = removeSchema(remove);
  }

  if (replace != null && !isEmpty(replace)) {
    shape.replace = replaceSchema(replace);
  }

  if (unset != null && !isEmpty(unset)) {
    shape.unset = unsetSchema(unset);
  }

  return z
    .strictObject(shape as SchemaShape<Rules>)
    .refine(
      (patch) =>
        ("add" in patch && patch.add != null) ||
        ("remove" in patch && patch.remove != null) ||
        ("unset" in patch && patch.unset != null) ||
        ("replace" in patch && patch.replace != null),
      { error: "should contain add least one update" },
    )
    .brand("Patch");
}

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

type JsonSchema = z.ZodType<Json>;

type FieldsSchemas = Record<string, JsonSchema>;

type Empty = Record<never, never>;

type SchemaShape<Opts extends PatchRules> = (Opts extends {
  add: FieldsSchemas;
}
  ? { add: ReturnType<typeof addSchema<Opts["add"]>> }
  : Empty) &
  (Opts extends {
    remove: FieldsSchemas;
  }
    ? { remove: ReturnType<typeof removeSchema<Opts["remove"]>> }
    : Empty) &
  (Opts extends {
    replace: FieldsSchemas;
  }
    ? { replace: ReturnType<typeof replaceSchema<Opts["replace"]>> }
    : Empty) &
  (Opts extends { unset: FieldsSchemas }
    ? { unset: ReturnType<typeof unsetSchema<Opts["unset"]>> }
    : Empty);

function addSchema<Add extends FieldsSchemas>(add: Add) {
  return z
    .strictObject(
      mapValues(add, (v) => v.optional()) as {
        [K in keyof Add]: z.ZodOptional<Add[K]>;
      },
    )
    .optional();
}

function removeSchema<Remove extends FieldsSchemas>(Remove: Remove) {
  return z
    .strictObject(
      mapValues(Remove, (v) => v.optional()) as {
        [K in keyof Remove]: z.ZodOptional<Remove[K]>;
      },
    )
    .optional();
}

function replaceSchema<Replace extends FieldsSchemas>(replace: Replace) {
  return z
    .strictObject(
      mapValues(replace, (v) =>
        z
          .strictObject({
            current: v,
            next: v,
          })
          .optional(),
      ) as {
        [K in keyof Replace]: z.ZodOptional<
          z.ZodObject<{
            current: Replace[K];
            next: Replace[K];
          }>
        >;
      },
    )
    .optional();
}

function unsetSchema<Unset extends FieldsSchemas>(unset: Unset) {
  return z
    .strictObject(
      mapValues(unset, (v) =>
        z
          .strictObject({
            current: v,
          })
          .optional(),
      ) as {
        [K in keyof Unset]: z.ZodOptional<
          z.ZodObject<{
            current: Unset[K];
          }>
        >;
      },
    )
    .optional();
}
