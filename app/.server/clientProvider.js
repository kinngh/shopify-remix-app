import sessionHandler from "./sessionHandler.js";
import shopify from "./shopify.js";

const fetchOfflineSession = async (shop) => {
  const sessionID = shopify.session.getOfflineId(shop);
  const session = await sessionHandler.loadSession(sessionID);
  return session;
};

const offline = {
  graphqlClient: async ({ shop }) => {
    const session = await fetchOfflineSession(shop);
    const client = new shopify.clients.Graphql({ session });
    return { client, shop, session };
  },

  restClient: async ({ shop }) => {
    const session = await fetchOfflineSession(shop);
    const client = new shopify.clients.Rest({
      session,
      apiVersion: process.env.SHOPIFY_API_VERSION,
    });
    return { client, shop, session };
  },
};

const fetchOnlineSession = async ({ request }) => {
  const sessionID = await shopify.session.getCurrentId({
    isOnline: true,
    rawRequest: request,
  });
  const session = await sessionHandler.loadSession(sessionID);
  return session;
};

const online = {
  graphqlClient: async ({ request }) => {
    const session = await fetchOnlineSession({ request });
    const client = new shopify.clients.Graphql({ session });
    const { shop } = session;
    return { client, shop, session };
  },
  restClient: async ({ request }) => {
    const session = await fetchOnlineSession({ request });
    const { shop } = session;
    const client = new shopify.clients.Rest({
      session,
      apiVersion: process.env.SHOPIFY_API_VERSION,
    });
    return { client, shop, session };
  },
};

const clientProvider = {
  offline,
  online,
};

export default clientProvider;
