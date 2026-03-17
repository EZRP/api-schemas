import { z } from "zod";

export type Email = z.infer<typeof schema>;

const schema = z.email().brand("Email");

export const email = () => schema;
