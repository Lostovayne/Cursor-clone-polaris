import { firecrawl } from "@/lib/firecrawl";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { inngest } from "./client";

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    // extraer del evento
    const { prompt } = event.data as { prompt: string };
    const urls = (await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) || [];
    })) as string[];

    // Scrape the URLs in parallel
    const scrapedContent = await step.run("scrape-urls", async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const result = await firecrawl.scrapeUrl(url, {
            formats: ["markdown"]
          });
          return result.success ? result.markdown : null;
        })
      );
      return results.filter(Boolean).join("\n\n");
    });

    const finalPrompt = scrapedContent
      ? `Context:\n${scrapedContent}\n\nQuestion: ${prompt}`
      : prompt;

    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-3-flash-preview"),
        prompt: finalPrompt,
        maxOutputTokens: 800
      });
    });
  }
);

export const demoError = inngest.createFunction(
  { id: "demo-error" },
  { event: "demo/error" },
  async ({ step }) => {
    await step.run("fail", async () => {
      throw new Error("Inngest Error: Something went wrong in the Inngest function!");
    });
  }
);
