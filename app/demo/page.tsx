"use client";

import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const handleBlocking = async () => {
    await fetch("/api/demo/blocking", {
      method: "POST"
    });
  };

  const handleBackground = async () => {
    await fetch("/api/demo/background", {
      method: "POST"
    });
  };

  // 1 Client Error

  const handleClientError = async () => {
    throw new Error("Client Error: Something went wrong in the browser!");
  };

  // 2 API Error
  const handleApiError = async () => {
    await fetch("/api/demo/error", {
      method: "POST"
    });
  };

  // 3 Inngest Error
  const handleInggestError = async () => {
    await fetch("/api/demo/inngest-error", {
      method: "POST"
    });
  };

  return (
    <div className="p-3 space-x-4 ">
      <Button onClick={handleBlocking} variant="outline">
        Blocking
      </Button>
      <Button onClick={handleBackground} variant="outline">
        Background
      </Button>
      <Button onClick={handleClientError} variant="destructive">
        Client Error
      </Button>

      <Button onClick={handleApiError} variant="outline">
        Api Error
      </Button>

      <Button onClick={handleInggestError} variant="outline">
        Inngest Error
      </Button>
    </div>
  );
}
