const STORAGE_KEY = "capstone.settings.v1";

const DEFAULTS = {
  displayName: "",
  email: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  theme: "system",
  compactMode: false,
  notifyEmail: true,
  notifyProduct: false,
  notifyDigest: true,
  publicProfile: false,
  analytics: true,
};

const form = document.getElementById("settings-form");
const statusEl = document.getElementById("form-status");
const timezoneSelect = document.getElementById("timezone");
const resetBtn = document.getElementById("reset-btn");

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

function collectForm() {
  const data = new FormData(form);
  return {
    displayName: String(data.get("displayName") || "").trim(),
    email: String(data.get("email") || "").trim(),
    timezone: String(data.get("timezone") || DEFAULTS.timezone),
    theme: String(data.get("theme") || DEFAULTS.theme),
    compactMode: document.getElementById("compact-mode").checked,
    notifyEmail: document.getElementById("notify-email").checked,
    notifyProduct: document.getElementById("notify-product").checked,
    notifyDigest: document.getElementById("notify-digest").checked,
    publicProfile: document.getElementById("public-profile").checked,
    analytics: document.getElementById("analytics").checked,
  };
}

function applyAppearance(settings) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved =
    settings.theme === "system" ? (prefersDark ? "dark" : "light") : settings.theme;
  document.documentElement.dataset.theme = resolved;
  document.body.classList.toggle("compact", Boolean(settings.compactMode));
}

function fillTimezones(selected) {
  const zones =
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("timeZone")
      : [selected, "UTC", "America/New_York", "Europe/London", "Asia/Kolkata"];

  timezoneSelect.replaceChildren();
  for (const zone of zones) {
    const option = document.createElement("option");
    option.value = zone;
    option.textContent = zone.replaceAll("_", " ");
    timezoneSelect.append(option);
  }
  timezoneSelect.value = zones.includes(selected) ? selected : "UTC";
}

function setFieldError(id, message) {
  const field = document.getElementById(id).closest(".field");
  const error = document.getElementById(`${id}-error`);
  if (!message) {
    field.classList.remove("invalid");
    error.hidden = true;
    error.textContent = "";
    document.getElementById(id).removeAttribute("aria-invalid");
    return;
  }
  field.classList.add("invalid");
  error.hidden = false;
  error.textContent = message;
  document.getElementById(id).setAttribute("aria-invalid", "true");
}

function validate(settings) {
  let ok = true;

  if (settings.displayName.length < 2) {
    setFieldError("display-name", "Enter a display name with at least 2 characters.");
    ok = false;
  } else {
    setFieldError("display-name", "");
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email);
  if (!emailOk) {
    setFieldError("email", "Enter a valid email address.");
    ok = false;
  } else {
    setFieldError("email", "");
  }

  return ok;
}

function populate(settings) {
  document.getElementById("display-name").value = settings.displayName;
  document.getElementById("email").value = settings.email;
  fillTimezones(settings.timezone);
  document.querySelector(`input[name="theme"][value="${settings.theme}"]`).checked = true;
  document.getElementById("compact-mode").checked = settings.compactMode;
  document.getElementById("notify-email").checked = settings.notifyEmail;
  document.getElementById("notify-product").checked = settings.notifyProduct;
  document.getElementById("notify-digest").checked = settings.notifyDigest;
  document.getElementById("public-profile").checked = settings.publicProfile;
  document.getElementById("analytics").checked = settings.analytics;
  applyAppearance(settings);
}

function showStatus(message, kind) {
  statusEl.hidden = false;
  statusEl.className = `status ${kind}`;
  statusEl.textContent = message;
}

const current = loadSettings();
populate(current);

form.addEventListener("input", () => {
  applyAppearance(collectForm());
  if (!statusEl.hidden && statusEl.classList.contains("ok")) {
    statusEl.hidden = true;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const next = collectForm();
  if (!validate(next)) {
    showStatus("Fix the highlighted fields, then save again.", "warn");
    const firstInvalid = form.querySelector("[aria-invalid='true']");
    firstInvalid?.focus();
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  applyAppearance(next);
  showStatus("Settings saved on this device.", "ok");
});

resetBtn.addEventListener("click", () => {
  const saved = loadSettings();
  populate(saved);
  setFieldError("display-name", "");
  setFieldError("email", "");
  showStatus("Form reset to the last saved values.", "ok");
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  applyAppearance(collectForm());
});
