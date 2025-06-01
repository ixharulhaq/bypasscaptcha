# 🔓 BypassCaptcha – Chrome Extension

**BypassCaptcha** is a Google Chrome extension that automatically detects and solves Google reCAPTCHA v2 challenges using the [2Captcha](https://2captcha.com) API. This extension streamlines web automation by solving captchas in the background.

---

## 🚀 Features

- 🔍 Detects reCAPTCHA v2 on web pages automatically.
- 🔗 Integrates seamlessly with [2Captcha](https://2captcha.com) for real-time solving.
- 🧠 Automatically fills in the captcha solution.
- 🖼️ Easy-to-use popup interface to enter and save your 2Captcha API key.
- 🛠️ Uses background and content scripts for efficient handling.

---

## 🧩 How It Works

1. You enter your **2Captcha API key** via the extension popup.
2. When a reCAPTCHA is detected on a webpage, the extension:
   - Extracts the site key and current page URL.
   - Sends a request to 2Captcha.
   - Waits for the solved token.
   - Automatically injects the solution into the captcha and submits it.

---

## 📥 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/ixharulhaq/bypasscaptcha.git
Step 2: Load as Unpacked Extension
Open Chrome and go to chrome://extensions/.

Enable Developer mode.

Click Load unpacked.

Select the bypasscaptcha folder you cloned.

🔑 2Captcha API Key Setup
Register at 2Captcha.

Go to your dashboard and copy your API key.

Open the extension popup and paste your API key.

Save it – you’re ready to go!

🧪 Usage
Navigate to a webpage containing a reCAPTCHA v2 challenge.

The extension detects it and starts solving.

Within seconds, the captcha is completed and submitted for you.

📁 Project Structure
graphql
Copy
Edit
bypasscaptcha/
├── automation.js        # Logic to auto-submit captcha token
├── background.js        # Handles communication with 2Captcha API
├── content.js           # Injected into pages to detect captcha
├── icon.png             # Extension icon
├── manifest.json        # Chrome extension config
├── popup.html           # Popup UI for entering API key
├── popup.js             # Logic for popup interactions
├── package.json         # NPM metadata
├── package-lock.json    # Dependency lock file
└── .gitignore           # Files ignored in version control
📦 Dependencies
This extension uses the following:

Chrome Extension APIs

2Captcha API

JavaScript ES6+

DOM manipulation for detecting & solving captchas

🛡️ License
This project is licensed under the MIT License.

swift
Copy
Edit
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy...
(Include full LICENSE file in your repo)

🤝 Contributing
Contributions are welcome!

Fork this repository.

Create a new branch (git checkout -b feature-name).

Make your changes.

Commit and push (git commit -m "Add feature").

Submit a pull request.

❓ FAQ
Q: What types of captchas are supported?
A: Currently supports reCAPTCHA v2. v3 and hCaptcha support is planned.

Q: Is my API key stored securely?
A: The key is stored locally in your browser's chrome.storage.local.

Q: Do I need a paid 2Captcha account?
A: Yes, solving captchas requires balance in your 2Captcha account.

📬 Contact
For support or feature requests, open an issue on the GitHub repository.

🌐 Links
🔗 2Captcha API Documentation

💻 Chrome Extensions Docs

📦 GitHub Repository

Disclaimer: This extension is intended for educational and research purposes only. Do not use it for malicious or unethical activities.

yaml
Copy
Edit

---

### ✅ How to Use This

1. Save the above content in a file named `README.md` in the root directory of your project.
2. Add and commit it:

```bash
git add README.md
git commit -m "Add detailed README with full project info"
git push origin main
