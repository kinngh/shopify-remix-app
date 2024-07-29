import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          src={`https://cdn.shopify.com/shopifycloud/app-bridge.js?apiKey=${global.SHOPIFY_API_KEY}`}
        ></script>
        <NavMenu>
          <Link to="/debug" rel="debug">
            Debug
          </Link>
        </NavMenu>
        <PolarisProvider i18n={translations}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </PolarisProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}
