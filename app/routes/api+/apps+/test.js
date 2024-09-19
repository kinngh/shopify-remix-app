/**
 * This is a test for interportability on something extremely specific
 * This is not the Remix way of doing things
 * This doesn't give you permission to get mad at me
 * Grazie
 */

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

/**
 * @type {import('@remix-run/node').ActionFunction} args - The action function arguments.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * @throws {Response} Throws a Response for unhandled webhook topics or when processing is complete.
 */
export async function action({ request }) {
  const { session, shop } = await verifyRequest(request);
  const req = await request.json();
  console.dir({ req }, { depth: null });
  return json({ message: "ok" });
}
