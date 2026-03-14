import { responses } from "./responses/index.js";
import { scalars } from "./scalars/index.js";

export type * from "./responses/index.js";
export type * from "./scalars/index.js";

export const schemas = {
  ...scalars,
  responses,
};
