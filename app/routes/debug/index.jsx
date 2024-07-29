import verifyRequest from "@/app/.server/middlewares/verifyRequest";
import { json, useNavigate } from "@remix-run/react";
import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";

/**
 * @param {import("@remix-run/node").LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * @throws {Response} Throws a Response for unhandled webhook topics or when processing is complete.
 */
export const loader = async ({ request }) => {
  const check = await verifyRequest(request);
  return json({ message: "ok" });
};

const DebugHome = () => {
  const nav = useNavigate();
  return (
    <>
      <Page
        title="Debug Cards"
        subtitle="Interact and explore the current installation"
        backAction={{ onAction: () => nav("/") }}
      >
        <Layout>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Webhooks
                </Text>
                <Text>Explored actively registered webhooks</Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      nav("/debug/webhooks");
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
                  Data Fetching
                </Text>
                <Text>
                  Send GET, POST and GraphQL queries to your app's backend.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      nav("/debug/data");
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
                  Billing API
                </Text>
                <Text>
                  Subscribe merchant to a plan and explore existing plans.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      nav("/debug/billing");
                    }}
                  >
                    Cha-Ching
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Resource Picker
                </Text>
                <Text>See how to use AppBridge CDN's Resource Picker</Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      nav("/debug/resourcePicker");
                    }}
                  >
                    Explore
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default DebugHome;
