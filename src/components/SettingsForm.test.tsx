import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SettingsForm from "./SettingsForm";

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Full name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  return user;
}

describe("SettingsForm", () => {
  it("shows a required-field error when the name is empty", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.click(screen.getByRole("button", { name: "Save settings" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Full name is required.");
    expect(screen.getByLabelText("Full name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(
      screen.queryByRole("status"),
    ).not.toBeInTheDocument();
  });

  it("shows an email validation error for an invalid address", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Full name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Save settings" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a valid email address.",
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("does not submit when both name and email are invalid", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: "Save settings" }));

    expect(screen.getByText("Full name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("submits a valid form and shows confirmation", async () => {
    render(<SettingsForm />);
    const user = await fillValidForm();
    await user.click(
      screen.getByRole("radio", { name: /Important only/i }),
    );
    await user.click(screen.getByRole("button", { name: "Save settings" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      /Settings saved.*ada@example.com.*important only/i,
    );
  });

  it("associates labels with inputs for keyboard use", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.tab();
    expect(screen.getByLabelText("Full name")).toHaveFocus();
    await user.tab();
    expect(screen.getByLabelText("Email")).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole("radio", { name: /Important only/i }),
    ).toHaveFocus();
  });
});
