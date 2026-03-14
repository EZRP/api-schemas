import { z } from "zod";

const error = z.strictObject({
  name: z.string(),
  message: z.string(),
});

const schema = z
  .strictObject({
    errors: z.array(error).min(1),
  })
  .brand("ErrorsResponse");

export type ErrorsResponse = z.infer<typeof schema>;

export const errors = () => schema;
