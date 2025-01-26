import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";
import "dotenv/config";

export default defineConfig({
  define: {
    SHOPIFY_API_KEY: JSON.stringify(
      process.env.SHOPIFY_API_KEY || "cannot read process"
    ),
  },
  server: {
    allowedHosts: [`${process.env.SHOPIFY_APP_URL.replace(/https:\/\//, "")}`],
  },
  plugins: [reactRouter(), jsconfigPaths()],
});
