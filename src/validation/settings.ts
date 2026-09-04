export type NotificationPreference = "all" | "important" | "none";

export type SettingsFormValues = {
  fullName: string;
  email: string;
  notificationPreference: NotificationPreference;
};

export type SettingsFormErrors = {
  fullName?: string;
  email?: string;
};

export const NOTIFICATION_OPTIONS: {
  value: NotificationPreference;
  label: string;
  description: string;
}[] = [
  {
    value: "all",
    label: "All notifications",
    description: "Receive every update, including product news and reminders.",
  },
  {
    value: "important",
    label: "Important only",
    description: "Only account, security, and required service messages.",
  },
  {
    value: "none",
    label: "No notifications",
    description: "Do not send email notifications.",
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSettings(
  values: SettingsFormValues,
): SettingsFormErrors {
  const errors: SettingsFormErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();

  if (!fullName) {
    errors.fullName = "Full name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}
