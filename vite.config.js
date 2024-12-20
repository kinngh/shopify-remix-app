import { reactRouter } from "@react-router/dev/vite";
import { installGlobals } from "react-router";
import "dotenv/config";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";

installGlobals();

export default defineConfig({
  define: {
    SHOPIFY_API_KEY: JSON.stringify(
      process.env.SHOPIFY_API_KEY || "cannot read process"
    ),
  },
  server: {
    port: parseInt(process.env.PORT || 3000),
    fs: {
      allow: ["app", "node_modules"],
    },
  },
  plugins: [
    reactRouter({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: [
            "**/*.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__*.*",
          ],
        });
      },
    }),
    jsconfigPaths(),
  ],
});
