import { currencyCode } from "./currencies/code.js";
import { environmentId } from "./environment-id.js";
import { standardString } from "./standard-string.js";

export type * from "./currencies/index.js";
export type * from "./environment-id.js";
export type * from "./standard-string.js";

export const scalars = {
  environmentId,
  standardString,
  currencyCode,
};
