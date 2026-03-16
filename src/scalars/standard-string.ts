import { z } from "zod";

export type StandardString = z.infer<typeof schema>;

const schema = z.string().min(1).max(256).brand("StandardString");

export const standardString = () => schema;
