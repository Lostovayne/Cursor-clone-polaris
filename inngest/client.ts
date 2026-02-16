import { sentryMiddleware } from "@inngest/middleware-sentry";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "polaris",
  middleware: [sentryMiddleware()]
});
