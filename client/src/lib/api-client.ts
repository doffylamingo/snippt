import type { ApiRoute } from "@api/app";
import { hc } from "hono/client";

const client = hc<ApiRoute>("/");

export const api = client.api;
