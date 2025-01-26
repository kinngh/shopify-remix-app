import { RequestedTokenType } from "@shopify/shopify-api";
import prisma from "../prisma";
import sessionHandler from "../sessionHandler";
import shopify from "../shopify";
import freshInstall from "./freshInstall";
import verifyRequest from "./verifyRequest";

const isInitialLoad = async ({ request }) => {
  try {
    let session = "";
    let shop = new URL(request?.url)?.searchParams?.get("shop") || "";
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

      shop = onlineSession.shop;
      session = onlineSession;
    } else {
      const { shop: requestShop, session: onlineSession } =
        await verifyRequest(request);

      shop = requestShop;
      session = onlineSession;
    }
    return { shop, session };
  } catch (e) {
    if (
      e?.message?.includes("Failed to parse session token") &&
      process.env.NODE_ENV === "development"
    ) {
      //In dev mode, you're in the same page and running through multiple reloads with HMR.
      // This causes JWT exp token validation to fail, aka the JWT token has expired.
      // It's fine to ignore in dev, but not in production, which shouldn't happen in the first place.
    } else {
      console.error(`---> An error occured at isInitialLoad: ${e.message}`, e);
    }
    //TODO: Handle this better, perhaps a 403?
    return { shop: "", session: "" };
  }
};

export default isInitialLoad;
