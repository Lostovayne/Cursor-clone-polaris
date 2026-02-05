import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { inngest } from "./client";

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-3-flash-preview"),
        prompt: `Escribe una pequeña historia sobre un robot que aprende a amar en español.`
      });
    });
  }
);
