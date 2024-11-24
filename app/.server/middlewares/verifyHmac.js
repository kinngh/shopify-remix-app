import { json } from "react-router";
import crypto from "crypto";
import shopify from "../shopify";

const verifyHmac = async (request) => {
  try {
    const generateHash = crypto
      .createHmac("SHA256", process.env.SHOPIFY_API_SECRET)
      .update(JSON.stringify(request.body), "utf8")
      .digest("base64");

    const hmac = request.headers["x-shopify-hmac-sha256"];

    if (shopify.auth.safeCompare(generateHash, hmac)) {
      //Move on
    } else {
      console.log(`---> An error occured while verifying HMAC`);
      return json(
        { success: false, message: "HMAC verification failed" },
        { status: 401 }
      );
    }
  } catch (e) {
    console.log(`---> An error occured while verifying HMAC`, e.message);
    return json(
      { success: false, message: "HMAC verification failed" },
      { status: 401 }
    );
  }
};

export default verifyHmac;
