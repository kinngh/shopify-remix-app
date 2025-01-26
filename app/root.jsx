import { AppProvider as PolarisProvider } from "@shopify/polaris";
import polarisCSS from "@shopify/polaris/build/esm/styles.css?url";
import translations from "@shopify/polaris/locales/en.json";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

export const links = () => [{ rel: "stylesheet", href: polarisCSS }];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          src={`https://cdn.shopify.com/shopifycloud/app-bridge.js?apiKey=${SHOPIFY_API_KEY}`}
        ></script>
        <Meta />
        <Links />
      </head>
      <body>
        <PolarisProvider i18n={translations}>
          <ui-nav-menu>
            <a href="/" rel="home">
              Home
            </a>
            <a href="/debug" rel="debug">
              Debug
            </a>
          </ui-nav-menu>
          {children}
        </PolarisProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
