import { currencyCode } from "./currencies/code.js";
import { currencyDigits } from "./currencies/digits.js";
import { currencyName } from "./currencies/name.js";
import { currencySymbol } from "./currencies/symbol.js";
import { environmentId } from "./environment-id.js";
import { standardString } from "./standard-string.js";

export type * from "./currencies/index.js";
export type * from "./environment-id.js";
export type * from "./standard-string.js";

export const scalars = {
  environmentId,
  standardString,
  currencyCode,
  currencyDigits,
  currencyName,
  currencySymbol,
};
