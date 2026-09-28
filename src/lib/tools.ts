import { tool } from "ai";
import { z } from "zod";

export const analyzeAccessibility = tool({
  description:
    "Analyze a UI element for basic accessibility. Use this when the user asks to check whether an interface element is accessible.",

  inputSchema: z.object({
    element: z
      .string()
      .min(1)
      .describe("The UI element being analyzed, such as a button, link, or form field."),

    hasAccessibleName: z
      .boolean()
      .describe("Whether the element has a clear accessible name or label."),

    keyboardAccessible: z
      .boolean()
      .describe("Whether the element can be operated using the keyboard."),

    hasFocusStyle: z
      .boolean()
      .describe("Whether the element has a visible focus style for keyboard users."),
  }),

  execute: async ({
    element,
    hasAccessibleName,
    keyboardAccessible,
    hasFocusStyle,
  }) => {
    // Deliberately fail for this value so we can demonstrate
    // the required output-error state during testing.
    if (element.toLowerCase() === "error-test") {
      throw new Error("Accessibility analysis failed intentionally for testing.");
    }

    const checks = [
      {
        label: "Accessible name",
        passed: hasAccessibleName,
        recommendation: "Add a clear accessible name or label.",
      },
      {
        label: "Keyboard accessible",
        passed: keyboardAccessible,
        recommendation: "Make sure the element can be reached and operated with the keyboard.",
      },
      {
        label: "Visible focus style",
        passed: hasFocusStyle,
        recommendation: "Add a clearly visible focus indicator.",
      },
    ];

    const passed = checks.filter((check) => check.passed).length;
    const score = Math.round((passed / checks.length) * 100);

    return {
      element,
      score,
      checks: checks.map(({ label, passed, recommendation }) => ({
        label,
        passed,
        recommendation: passed ? null : recommendation,
      })),
    };
  },
});