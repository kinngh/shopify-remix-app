import { json } from "react-router";
import { RequestedTokenType, Session } from "@shopify/shopify-api";
import sessionHandler from "../sessionHandler.js";
import shopify from "../shopify.js";
import validateJWT from "../validateJWT.js";

/**
 * @param {import("react-router").LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * @throws {Response} Throws a Response for unhandled webhook topics or when processing is complete.
 */
const verifyRequest = async (request) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw Error("No authorization header found");
    }
    const payload = validateJWT(authHeader.split(" ")[1]);

    let shop = shopify.utils.sanitizeShop(payload.dest.replace("https://", ""));
    if (!shop) {
      throw Error("No shop found, not a valid request");
    }
    const sessionId = shopify.session.getJwtSessionId(shop, payload.sub);
    let session = "";
    if (!sessionId) {
      session = await getSession({ shop, authHeader });
    } else {
      session = await sessionHandler.loadSession(sessionId);
    }

    if (!session) {
      session = await getSession({ shop, authHeader });
    }

    if (
      new Date(session?.expires) > new Date() &&
      shopify.config.scopes.equals(session?.scope)
    ) {
    } else {
      session = await getSession({ shop, authHeader });
    }

    return { session: session, shop: shop };
  } catch (e) {
    console.error(
      `---> An error occured at verifyRequest middleware: ${e.message}`
    );
    throw json("", {
      status: 403,
    });
  }
};

export default verifyRequest;

/**
 * Retrieves and stores session information based on the provided authentication header and offline flag.
 *
 * @async
 * @function getSession
 * @param {Object} params - The function parameters.
 * @param {string} params.shop - The xxx.myshopify.com url of the requesting store.
 * @param {string} params.authHeader - The authorization header containing the session token.
 * @returns {Promise<Session>} The online session object
 */
async function getSession({ shop, authHeader }) {
  try {
    const sessionToken = authHeader.split(" ")[1];

    const { session: onlineSession } = await shopify.auth.tokenExchange({
      sessionToken,
      shop,
      requestedTokenType: RequestedTokenType.OnlineAccessToken,
    });

    sessionHandler.storeSession(onlineSession);

    const { session: offlineSession } = await shopify.auth.tokenExchange({
      sessionToken,
      shop,
      requestedTokenType: RequestedTokenType.OfflineAccessToken,
    });

    sessionHandler.storeSession(offlineSession);

    return new Session(onlineSession);
  } catch (e) {
    console.error(
      `---> Error happened while pulling session from Shopify: ${e.message}`
    );
  }
}
