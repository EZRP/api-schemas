import type { z } from "zod";
import { standardString } from "../scalars/standard-string.js";
import { patch } from "./patch.js";

export type PatchEnvironmentCompany = z.infer<typeof schema>;

const schema = patch({
  replace: {
    doingBusinessAs: standardString(),
  },
}).brand("PatchEnvironmentCompany");

export const patchEnvironmentCompany = () => schema;
