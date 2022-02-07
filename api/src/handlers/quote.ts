import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { createCarQuoteCalculator } from "../modules/insurance";

type QuoteBody = Static<typeof QuoteBody>;
const QuoteBody = Type.Object({
  carBrand: Type.String(),
  carValue: Type.Number(),
  driverAge: Type.Number(),
});

// Case note: Yearly is added to backend computation
// That way it's easier to change formula in case of volume discounts.
type QuoteResponse = Static<typeof QuoteResponse>;
const QuoteResponse = Type.Object({
  universal: Type.Object({
    monthly: Type.Number(),
    yearly: Type.Number(),
  }),
  global: Type.Object({
    monthly: Type.Number(),
    yearly: Type.Number(),
  }),
});

export async function quote(fastify: FastifyInstance) {
  fastify.post<{ Body: QuoteBody; Reply: QuoteResponse }>(
    "/quote",
    { schema: { body: QuoteBody } },
    async (request, reply) => {
      try {
        const calculator = createCarQuoteCalculator(request.body);
        const offer = calculator.compute();
        reply.status(200).send(offer);
      } catch (err) {
        reply.badRequest(err instanceof Error ? err.message : "unknown_error");
      }
    },
  );
}
