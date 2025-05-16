# 🤖 CAPTCHA Solver Bot

This Node.js script automates solving Google's reCAPTCHA v2 using Selenium and 2Captcha's API.

## 🔧 Features

- Detects reCAPTCHA v2 on page load
- Sends request to 2Captcha to solve it
- Injects the solution token into the page
- Submits the form or clicks confirmation
- Fully automatable with `pm2` or cron

---

## 🛠️ Technologies

- Node.js
- Selenium WebDriver
- Axios
- 2Captcha API

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/captcha-solver-bot.git
cd captcha-solver-bot

## Run

npm install


Open automation.js and update this line:


const TWO_CAPTCHA_API_KEY = 'your_api_key_here';

node automation.js

Run it in background with pm2

npm install -g pm2
pm2 start automation.js --name captcha-solver
pm2 save

🧪 Notes
Make sure Chrome is installed and compatible with your chromedriver.

Script currently works with Google's reCAPTCHA v2 (checkbox version).

Intended for educational and testing use only.
