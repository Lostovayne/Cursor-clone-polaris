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

  return (
    <div className="p-8 space-x-4 ">
      <Button onClick={handleBlocking} variant="outline">
        Blocking
      </Button>
      <Button onClick={handleBackground} variant="outline">
        Background
      </Button>
    </div>
  );
}
