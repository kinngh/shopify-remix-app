import verifyRequest from "@/app/.server/middlewares/verifyRequest";
import { json } from "@remix-run/react";

/**
 * @param {import("@remix-run/node").LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * @throws {Response} Throws a Response for unhandled webhook topics or when processing is complete.
 */
export const loader = async ({ request }) => {
  const { session, shop } = await verifyRequest(request);
  return json({ message: "ok" });
};
