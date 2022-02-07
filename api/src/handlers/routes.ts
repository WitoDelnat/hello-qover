import { FastifyInstance } from "fastify";
import { login } from "./login";
import { quote } from "./quote";

export async function routes(fastify: FastifyInstance) {
  fastify.register(login);
  fastify.register(quote);
}
