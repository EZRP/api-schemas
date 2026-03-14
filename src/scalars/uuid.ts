import { z } from "zod";

export type Uuid = z.infer<typeof schema>;

const schema = z.uuid().brand("Uuid");

export const uuid = () => schema;
