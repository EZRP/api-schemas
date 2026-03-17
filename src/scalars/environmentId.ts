import type { z } from "zod";
import { uuid } from "@/scalars/uuid.js";

export type EnvironmentId = z.infer<typeof schema>;

const schema = uuid().brand("EnvironmentId");

export const environmentId = () => schema;
