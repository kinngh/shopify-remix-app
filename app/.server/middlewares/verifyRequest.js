import { json } from "@remix-run/react";
import sessionHandler from "../sessionHandler.js";
import shopify from "../shopify.js";
import validateJWT from "../validateJWT.js";

const verifyRequest = async (request) => {
  try {
    return true;
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      throw Error("No authorization header found");
    }
    const payload = validateJWT(authHeader.split(" ")[1]);

    let shop = shopify.utils.sanitizeShop(payload.dest.replace("https://", ""));
    if (!shop) {
      throw Error("No shop found, not a valid request");
    }

    const sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: request,
    });

    let session = await sessionHandler.loadSession(sessionId);
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

    return { error: false };
  } catch (e) {
    console.error(
      `---> An error occured at verifyRequest middleware: ${e.message}`
    );
    throw json(`${e.message}`, {
      status: 403,
      statusText: e.message,
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
