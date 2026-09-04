import { describe, expect, it } from "vitest";
import { validateSettings } from "./settings";

describe("validateSettings", () => {
  it("requires a full name", () => {
    const errors = validateSettings({
      fullName: "   ",
      email: "ada@example.com",
      notificationPreference: "all",
    });

    expect(errors.fullName).toBe("Full name is required.");
    expect(errors.email).toBeUndefined();
  });

  it("requires an email address", () => {
    const errors = validateSettings({
      fullName: "Ada Lovelace",
      email: "",
      notificationPreference: "all",
    });

    expect(errors.email).toBe("Email is required.");
  });

  it("rejects an invalid email format", () => {
    const errors = validateSettings({
      fullName: "Ada Lovelace",
      email: "not-an-email",
      notificationPreference: "all",
    });

    expect(errors.email).toBe("Enter a valid email address.");
  });

  it("accepts a valid form", () => {
    const errors = validateSettings({
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      notificationPreference: "important",
    });

    expect(errors).toEqual({});
  });
});
