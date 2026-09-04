import { useId, useState, type FormEvent } from "react";
import {
  NOTIFICATION_OPTIONS,
  validateSettings,
  type NotificationPreference,
  type SettingsFormValues,
} from "../validation/settings";
import "./SettingsForm.css";

const INITIAL_VALUES: SettingsFormValues = {
  fullName: "",
  email: "",
  notificationPreference: "important",
};

export default function SettingsForm() {
  const formId = useId();
  const nameId = `${formId}-full-name`;
  const emailId = `${formId}-email`;
  const nameErrorId = `${formId}-full-name-error`;
  const emailErrorId = `${formId}-email-error`;
  const successId = `${formId}-success`;

  const [values, setValues] = useState<SettingsFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateSettings(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  const selectedOption = NOTIFICATION_OPTIONS.find(
    (option) => option.value === values.notificationPreference,
  );

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <div className="settings-form__header">
        <h1>Account settings</h1>
        <p>
          Update your profile and choose how you want to hear from us.
        </p>
      </div>

      {submitted ? (
        <p
          id={successId}
          className="settings-form__success"
          role="status"
          aria-live="polite"
        >
          Settings saved. We’ll use {values.email.trim()} and send{" "}
          {selectedOption?.label.toLowerCase() ?? "your selected notifications"}
          .
        </p>
      ) : null}

      <div className="settings-form__field">
        <label htmlFor={nameId}>Full name</label>
        <input
          id={nameId}
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              fullName: event.target.value,
            }));
            setSubmitted(false);
          }}
          aria-required="true"
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? nameErrorId : undefined}
        />
        {errors.fullName ? (
          <p id={nameErrorId} className="settings-form__error" role="alert">
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <div className="settings-form__field">
        <label htmlFor={emailId}>Email</label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              email: event.target.value,
            }));
            setSubmitted(false);
          }}
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? emailErrorId : undefined}
        />
        {errors.email ? (
          <p id={emailErrorId} className="settings-form__error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <fieldset className="settings-form__fieldset">
        <legend>Notification preference</legend>
        <p className="settings-form__hint" id={`${formId}-notifications-hint`}>
          Choose which emails you want to receive.
        </p>
        <div className="settings-form__options">
          {NOTIFICATION_OPTIONS.map((option) => {
            const optionId = `${formId}-notify-${option.value}`;
            const descriptionId = `${optionId}-description`;

            return (
              <label key={option.value} className="settings-form__option" htmlFor={optionId}>
                <input
                  id={optionId}
                  type="radio"
                  name="notificationPreference"
                  value={option.value}
                  checked={values.notificationPreference === option.value}
                  onChange={() => {
                    setValues((current) => ({
                      ...current,
                      notificationPreference:
                        option.value as NotificationPreference,
                    }));
                    setSubmitted(false);
                  }}
                  aria-describedby={descriptionId}
                />
                <span>
                  <span className="settings-form__option-label">
                    {option.label}
                  </span>
                  <span id={descriptionId} className="settings-form__option-copy">
                    {option.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button type="submit" className="settings-form__submit">
        Save settings
      </button>
    </form>
  );
}
