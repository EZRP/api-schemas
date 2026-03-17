import { z } from "zod";

export type URL = z.infer<typeof schema>;

const schema = z.url().brand("URL");

export const url = () => schema;
