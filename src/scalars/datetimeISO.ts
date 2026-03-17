import { z } from "zod";

export type DateTimeISO = z.infer<typeof schema>;

const schema = z.iso.datetime().brand("DateTimeISO");

export const dateTimeISO = () => schema;
