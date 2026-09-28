import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const messages = req.body?.messages ?? [];
    const lastMessage = messages.at(-1);

    const text =
      lastMessage?.parts
        ?.filter((part: any) => part.type === "text")
        ?.map((part: any) => part.text)
        ?.join(" ")
        ?.trim() ?? "";

    if (!text) {
      return res.status(400).send("Please send a message.");
    }

    const isErrorTest = text.toLowerCase().includes("error-test");

    const element = text.toLowerCase().includes("link")
      ? "Link"
      : text.toLowerCase().includes("form")
        ? "Form field"
        : "Submit button";

    const result = {
      element,
      score: 67,
      checks: [
        {
          label: "Accessible name",
          passed: true,
          recommendation: null,
        },
        {
          label: "Keyboard accessible",
          passed: true,
          recommendation: null,
        },
        {
          label: "Visible focus style",
          passed: false,
          recommendation: "Add a clearly visible focus indicator.",
        },
      ],
    };

    const stream = createUIMessageStream({
      execute({ writer }) {
        writer.write({
          type: "start",
          messageId: crypto.randomUUID(),
        });

        writer.write({
          type: "text-start",
          id: "text-1",
        });

        writer.write({
          type: "text-delta",
          id: "text-1",
          delta: isErrorTest
            ? "I could not complete the accessibility analysis."
            : "I analyzed the element using the accessibility tool.",
        });

        writer.write({
          type: "text-end",
          id: "text-1",
        });

        writer.write({
          type: "tool-input-start",
          toolCallId: "demo-tool-1",
          toolName: "analyzeAccessibility",
        });

        writer.write({
          type: "tool-input-delta",
          toolCallId: "demo-tool-1",
          inputTextDelta: JSON.stringify({
            element,
            hasAccessibleName: true,
            keyboardAccessible: true,
            hasFocusStyle: false,
          }),
        });

        writer.write({
          type: "tool-input-available",
          toolCallId: "demo-tool-1",
          toolName: "analyzeAccessibility",
          input: {
            element,
            hasAccessibleName: true,
            keyboardAccessible: true,
            hasFocusStyle: false,
          },
        });

        if (isErrorTest) {
          writer.write({
            type: "tool-output-error",
            toolCallId: "demo-tool-1",
            errorText:
              "Accessibility analysis failed intentionally for testing.",
          });
        } else {
          writer.write({
            type: "tool-output-available",
            toolCallId: "demo-tool-1",
            output: result,
          });
        }

        writer.write({
          type: "finish",
        });
      },
    });

    const response = createUIMessageStreamResponse({
      stream,
    });

    res.status(response.status);

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.body) {
      return res.status(500).send("No response stream.");
    }

    const reader = response.body.getReader();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      res.write(Buffer.from(value));
    }

    return res.end();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Unable to generate response.");
  }
}