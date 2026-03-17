import { z } from "zod";

export type String255 = z.infer<typeof schema>;

const schema = z.string().max(255).brand("String255");

export const string255 = () => schema;
