import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

type AccessibilityResult = {
  element: string;
  score: number;
  checks: {
    label: string;
    passed: boolean;
    recommendation: string | null;
  }[];
};

function AccessibilityCard({
  result,
}: {
  result: AccessibilityResult;
}) {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Accessibility Analysis
          </p>
          <p className="text-sm text-slate-500">{result.element}</p>
        </div>

        <div className="rounded-full bg-slate-100 px-3 py-1 text-lg font-bold text-slate-900">
          {result.score}/100
        </div>
      </div>

      <div className="space-y-2">
        {result.checks.map((check) => (
          <div
            key={check.label}
            className="rounded-md border border-slate-200 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-slate-900">
                {check.label}
              </span>

              <span
                className={
                  check.passed
                    ? "text-sm font-semibold text-green-700"
                    : "text-sm font-semibold text-red-700"
                }
              >
                {check.passed ? "Pass" : "Needs attention"}
              </span>
            </div>

            {!check.passed && check.recommendation && (
              <p className="mt-1 text-sm text-slate-600">
                {check.recommendation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolPart({ part }: { part: any }) {
  if (part.type !== "tool-analyzeAccessibility") {
    return null;
  }

  if (part.state === "input-streaming") {
    return (
      <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-900">
          Accessibility tool
        </p>
        <p className="mt-1 text-sm text-blue-700">
          Preparing analysis input…
        </p>
      </div>
    );
  }

  if (part.state === "input-available") {
    return (
      <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Accessibility tool
        </p>
        <p className="mt-1 text-sm text-amber-700">
          Input received. Running accessibility checks…
        </p>
      </div>
    );
  }

  if (part.state === "output-error") {
    return (
      <div
        role="alert"
        className="mt-3 rounded-lg border border-red-200 bg-red-50 p-4"
      >
        <p className="text-sm font-semibold text-red-900">
          Accessibility analysis failed
        </p>
        <p className="mt-1 text-sm text-red-700">
          {part.errorText || "The tool could not complete the analysis."}
        </p>
      </div>
    );
  }

  if (part.state === "output-available") {
    return <AccessibilityCard result={part.output} />;
  }

  return null;
}

export default function Chat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const loading =
    status === "submitted" || status === "streaming";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const text = input.trim();

    if (!text || loading) return;

    setInput("");

    await sendMessage({
      text,
    });
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Chat</h1>

        <p className="text-slate-600">
          Ask questions about frontend development and accessibility.
        </p>
      </div>

      <div
        className="min-h-64 space-y-4 rounded-lg border bg-white p-4"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 && (
          <p className="text-sm text-slate-500">
            Try asking:
            <br />
            <span className="font-medium">
              "Analyze the accessibility of my Submit button."
            </span>
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg p-3 ${
              message.role === "user"
                ? "ml-8 bg-blue-100 text-slate-900"
                : "mr-8 bg-slate-100 text-slate-900"
            }`}
          >
            <p className="mb-1 text-sm font-semibold">
              {message.role === "user" ? "You" : "Assistant"}
            </p>

            <div className="space-y-2">
              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <p
                      key={`${message.id}-text-${index}`}
                      className="whitespace-pre-wrap break-words"
                    >
                      {part.text}
                    </p>
                  );
                }

                if (part.type === "tool-analyzeAccessibility") {
                  return (
                    <ToolPart
                      key={`${message.id}-tool-${index}`}
                      part={part}
                    />
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {loading && messages.at(-1)?.role === "user" && (
          <div className="mr-8 rounded-lg bg-slate-100 p-3">
            <p className="text-sm font-semibold">Assistant</p>
            <p className="mt-1 text-slate-500">Thinking…</p>
          </div>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 p-3 text-red-700"
        >
          {error.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="chat-input"
          className="block text-sm font-medium"
        >
          Your message
        </label>

        <textarea
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask something..."
          disabled={loading}
          rows={3}
          className="w-full rounded-lg border border-slate-300 bg-white p-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </section>
  );
}