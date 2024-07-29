import { RequestedTokenType } from "@shopify/shopify-api";
import prisma from "../prisma";
import sessionHandler from "../sessionHandler";
import shopify from "../shopify";
import freshInstall from "./freshInstall";
import verifyRequest from "./verifyRequest";

const isInitialLoad = async ({ request }) => {
  try {
    const shop = new URL(request.url).searchParams.get("shop");
    const idToken = new URL(request.url).searchParams.get("id_token");

    if (idToken && shop) {
      const { session: offlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OfflineAccessToken,
      });
      const { session: onlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OnlineAccessToken,
      });

      await sessionHandler.storeSession(offlineSession);
      await sessionHandler.storeSession(onlineSession);
      const isFreshInstall = await prisma.stores.findFirst({
        where: {
          shop: onlineSession.shop,
        },
      });

      if (!isFreshInstall || isFreshInstall?.isActive === false) {
        // !isFreshInstall -> New Install
        // isFreshInstall?.isActive === false -> Reinstall
        await freshInstall({ shop: onlineSession.shop });
      }
      return { shop, session: onlineSession };
    } else {
      const { shop: requestShop, session } = await verifyRequest(request);
      return { shop: requestShop, session };
    }
  } catch (e) {
    if (e.message.includes("timestamp check failed")) {
      console.error(
        "JWT Error - happens in dev mode and can be safely ignored."
      );
    } else {
      console.error(`---> An error occured at isInitialLoad: ${e.message}`, e);
    }
  }
};

export default isInitialLoad;
