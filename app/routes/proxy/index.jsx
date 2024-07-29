import { json } from "@remix-run/react";

export const loader = ({ request }) => {
  return json({ message: "ok" });
};
