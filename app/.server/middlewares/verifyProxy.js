import crypto from "crypto";

const verifyProxy = async (request) => {
  const { signature } = request.query;

  const queryURI = encodeQueryData(request.query)
    .replace("/?", "")
    .replace(/&signature=[^&]*/, "")
    .split("&")
    .map((x) => decodeURIComponent(x))
    .sort()
    .join("");

  const calculatedSignature = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(queryURI, "utf-8")
    .digest("hex");

  if (calculatedSignature === signature) {
    // request.user_shop = request.query.shop; //myshopify domain
  } else {
    throw json(
      {
        success: false,
        message: "Signature verification failed",
      },
      { status: 401 }
    );
  }
};

/**
 * Encodes the provided data into a URL query string format.
 *
 * @param {Record<string, any>} data - The data to be encoded.
 * @returns {string} The encoded query string.
 */
function encodeQueryData(data) {
  const queryString = [];
  for (let d in data) queryString.push(d + "=" + encodeURIComponent(data[d]));
  return queryString.join("&");
}

export default verifyProxy;
