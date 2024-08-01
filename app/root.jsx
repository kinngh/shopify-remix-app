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
import polarisCSS from "@shopify/polaris/build/esm/styles.css?url";
import translations from "@shopify/polaris/locales/en.json";

export const links = () => [{ rel: "stylesheet", href: polarisCSS }];

export function Layout({ children }) {
  let shop;
  if (typeof window !== "undefined") {
    shop = window.shopify?.config?.shop;
  }
  const NoShopProvided = () => {
    return (
      <>
        <p>No shop was provided</p>
      </>
    );
  };
  if (!shop) {
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
            src={`https://cdn.shopify.com/shopifycloud/app-bridge.js?apiKey=${SHOPIFY_API_KEY}`}
          ></script>
          <PolarisProvider i18n={translations}>
            <NoShopProvided />
            <ScrollRestoration />
            <Scripts />
          </PolarisProvider>
        </body>
      </html>
    );
  }
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
          src={`https://cdn.shopify.com/shopifycloud/app-bridge.js?apiKey=${SHOPIFY_API_KEY}`}
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
