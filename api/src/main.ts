import { FastifyInstance } from "fastify";
import Graceful from "node-graceful";
import { config } from "./config";
import { routes } from "./handlers/routes";
import { createServer } from "./server/createServer";
import { logger } from "./utils/logger";
import { connectMongoose } from "./database/mongoose";
import { addFirstUser } from "./modules/auth";

let server: FastifyInstance;

(async function main() {
  logger.info("Starting database connection..");
  await connectMongoose(config.database);

  // Case shortcut
  await addFirstUser();

  logger.info("Starting server..");
  server = createServer({
    routes,
  });

  logger.info("Server ready");
  await server.listen(config.server.port, "0.0.0.0");
})();

Graceful.captureExceptions = true;
Graceful.captureRejections = false;
Graceful.on("exit", async (signal, details) => {
  logger.info({ signal, details }, "Terminating gracefully");
  await server.close();
});
