import isInitialLoad from "@/app/.server/middlewares/isInitialLoad";
import { json, useNavigate } from "@remix-run/react";
import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import { ExternalIcon } from "@shopify/polaris-icons";

export const loader = async ({ request }) => {
  //DO NOT REMOVE
  const { session, shop } = await isInitialLoad({ request });
  return json({ message: "ok" });
};

const HomePage = () => {
  const nav = useNavigate();
  return (
    <>
      <Page title="Home">
        <Layout>
          <Layout.Section variant="fullWidth">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Debug Cards
                </Text>
                <Text>
                  Explore how the repository handles data fetching from the
                  backend, App Proxy, making GraphQL requests, Billing API and
                  more.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      nav("/debug");
                    }}
                  >
                    Debug Cards
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  App Bridge CDN
                </Text>
                <Text>AppBridge has moved from an npm package to CDN</Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    external
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://shopify.dev/docs/api/app-bridge-library/reference",
                        "_blank"
                      );
                    }}
                  >
                    Explore
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Repository
                </Text>
                <Text>
                  Found a bug? Open an issue on the repository, or star on
                  GitHub
                </Text>
                <InlineStack wrap={false} align="end" gap="200">
                  <Button
                    external
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://github.com/kinngh/shopify-remix-app/issues?q=is%3Aissue",
                        "_blank"
                      );
                    }}
                  >
                    Issues
                  </Button>
                  <Button
                    external
                    variant="primary"
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://github.com/kinngh/shopify-remix-app",
                        "_blank"
                      );
                    }}
                  >
                    Star
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Course
                </Text>
                <Text>
                  [BETA] I'm building course as a live service on How To Build
                  Shopify Apps
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    external
                    variant="primary"
                    icon={ExternalIcon}
                    onClick={() => {
                      open(
                        "https://kinngh.gumroad.com/l/how-to-make-shopify-apps?utm_source=boilerplate&utm_medium=remix",
                        "_blank"
                      );
                    }}
                  >
                    Buy
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf" />
        </Layout>
      </Page>
    </>
  );
};

export default HomePage;
