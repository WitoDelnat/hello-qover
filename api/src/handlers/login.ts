import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { config } from "../config";
import { User, createAccessToken, createHash } from "../modules/auth";

type LoginBody = Static<typeof LoginBody>;
const LoginBody = Type.Object({
  username: Type.String(),
  password: Type.String(),
});

// See https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/
type LoginResponse = Static<typeof LoginResponse>;
const LoginResponse = Type.Object({
  token_type: Type.Literal("Bearer"),
  access_token: Type.String(),
  expires_in: Type.Number(),
});

export async function login(fastify: FastifyInstance) {
  fastify.post<{ Body: LoginBody; Reply: LoginResponse }>(
    "/login",
    { schema: { body: LoginBody } },
    async (request, reply) => {
      const { username, password } = request.body;
      const user = await User.findOne({ username }).exec();

      if (!user) {
        return reply.unauthorized();
      }

      const hash = createHash(password, user.salt);

      if (user.password !== hash) {
        return reply.unauthorized();
      }

      const accessToken = createAccessToken(user.id);

      return reply.status(200).send({
        token_type: "Bearer",
        access_token: accessToken,
        expires_in: config.auth.expiresAfterSeconds,
      });
    },
  );
}
