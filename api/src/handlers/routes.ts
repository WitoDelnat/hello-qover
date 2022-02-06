import { FastifyInstance } from "fastify";
import { login } from "./login";

export async function routes(fastify: FastifyInstance) {
  fastify.register(login);
}
