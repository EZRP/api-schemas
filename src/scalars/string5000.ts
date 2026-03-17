import { z } from "zod";

export type String5000 = z.infer<typeof schema>;

const schema = z.string().max(5000).brand("String5000");

export const string5000 = () => schema;
