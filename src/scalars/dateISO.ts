import { z } from "zod";

export type DateISO = z.infer<typeof schema>;

const schema = z.iso.date().brand("DateISO");

export const dateISO = () => schema;
