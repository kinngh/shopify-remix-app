import verifyRequest from "@/app/.server/middlewares/verifyRequest";
import { useNavigate, json } from "@remix-run/react";
import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";

/**
 * @param {import("@remix-run/node").LoaderFunctionArgs} args - The loader function arguments.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * @throws {Response} Throws a Response for unhandled webhook topics or when processing is complete.
 */
export const loader = async ({ request }) => {
  const { session, shop } = await verifyRequest(request);
  return json({ message: "ok" });
};

const DebugWebhooks = () => {
  const nav = useNavigate();
  return (
    <>
      <Page
        title="Page Title"
        backAction={{
          onAction: () => {
            nav("/debug");
          },
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd">Heading</Text>
                <Text>Regular Text Content</Text>
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert("Button pressed");
                    }}
                  >
                    Button
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

export default DebugWebhooks;
