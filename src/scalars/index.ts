import { currencyCode } from "./currency/code.js";
import { currencyDigits } from "./currency/digits.js";
import { currencyName } from "./currency/name.js";
import { currencySymbol } from "./currency/symbol.js";
import { environmentId } from "./environment-id.js";
import { standardString } from "./standard-string.js";

export type * from "./currency/index.js";
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
