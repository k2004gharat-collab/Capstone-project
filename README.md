# Capstone Project

This repository holds Kirti's capstone project. The first screen is a settings form for account, appearance, notifications, and privacy preferences.

## What's in this repository

| File | Purpose |
|------|---------|
| `index.html` | Settings form markup |
| `styles.css` | Layout and theme styles |
| `settings.js` | Validation, theme preview, and local save |
| `README.md` | Project overview (this file) |
| `LICENSE` | MIT License |
| `CLAUDE.md` | Notes for AI coding assistants |
| `.gitignore` | Git ignore rules |

## Getting started

Clone the repository:

```bash
git clone https://github.com/k2004gharat-collab/Capstone-project.git
cd Capstone-project
```

Open the settings form by serving the project folder (needed so the page can save preferences in the browser):

```bash
python -m http.server 5173
```

Then visit `http://localhost:5173`. The form covers account, appearance, notifications, and privacy. Valid settings are stored in `localStorage` on this device.

## License

This project is licensed under the [MIT License](LICENSE). Copyright (c) 2026 Kirti.
