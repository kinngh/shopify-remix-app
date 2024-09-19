import verifyProxy from "@/app/.server/middlewares/verifyProxy";
import { json } from "@remix-run/react";

/**
 * @param {import("@remix-run/node").LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * @throws {Response} Throws a Response for unhandled webhook topics or when processing is complete.
 */
export const loader = async ({ request }) => {
  const { shop } = await verifyProxy(request);
  return json({ message: "ok" });
};
