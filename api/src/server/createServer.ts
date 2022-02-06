import Fastify, { FastifyPluginAsync } from "fastify";
import fastifyCors from "fastify-cors";
import fastifySensible from "fastify-sensible";
import { logger } from "../utils/logger";
import fastifyHealth from "./fastify-health";

type ServerInit = {
  routes: FastifyPluginAsync;
};

export function createServer({ routes }: ServerInit) {
  const server = Fastify({ logger });

  // Note: Normally you would lock this down in production.
  server.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: "*",
  });
  server.register(fastifySensible, { errorHandler: false });
  server.register(fastifyHealth);

  server.register(routes, { prefix: "api" });

  return server;
}
