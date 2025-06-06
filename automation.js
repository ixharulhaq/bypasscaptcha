// const { Builder, By, until } = require('selenium-webdriver');
// const axios = require('axios');

// const TWO_CAPTCHA_API_KEY = '10c_8f016bbfd6a1b5a33dc4985e594852b0';
// const TARGET_URL = 'https://2captcha.com/demo/recaptcha-v2';
// const SITE_KEY = '6LfD3PIbAAAAAJs_eEHvoOl75_83eXSqpPSRFJ_u';

// (async () => {
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     await driver.get(TARGET_URL);

//     // Wait for reCAPTCHA iframe to load
//     await driver.wait(until.elementLocated(By.css('.g-recaptcha')), 10000);
//     console.log('CAPTCHA detected! Requesting 2Captcha to solve...');

//     const balance = await axios.get('https://ocr.10captcha.com/res.php', {
//     params: {
//         key: TWO_CAPTCHA_API_KEY,
//         action: 'getbalance',
//         json: 1,
//     }
//     });
//     console.log('Balance:', balance.data);

//     // 1. Submit CAPTCHA solving request to 2Captcha
//     const inResponse = await axios.get('https://ocr.10captcha.com/in.php', {
//       params: {
//         key: TWO_CAPTCHA_API_KEY,
//         method: 'userrecaptcha',
//         googlekey: SITE_KEY,
//         pageurl: TARGET_URL,
//         json: 1,
//       }
//     });

//     console.log('2Captcha in.php response:', inResponse.data);

//     if (inResponse.data.status !== 1) {
//       throw new Error(`2Captcha submission failed: ${inResponse.data.request}`);
//     }

//     const requestId = inResponse.data.request;

//     // 2. Poll for CAPTCHA solution
//     let token;
//     for (let i = 0; i < 20; i++) {
//       console.log(`Polling for CAPTCHA result... attempt ${i + 1}`);
//       await new Promise(r => setTimeout(r, 15000)); // wait 15 seconds

//       const res = await axios.get('https://ocr.10captcha.com/res.php', {
//         params: {
//           key: TWO_CAPTCHA_API_KEY,
//           action: 'get',
//           id: requestId,
//           json: 1,
//         }
//       });

//       if (res.data.status === 1) {
//         token = res.data.request;
//         console.log('CAPTCHA solved:', token);
//         break;
//       } else if (res.data.request === 'CAPCHA_NOT_READY') {
//         console.log('CAPTCHA not ready yet, waiting...');
//       } else {
//         throw new Error(`2Captcha error: ${res.data.request}`);
//       }
//     }

//     if (!token) {
//       throw new Error('Failed to solve CAPTCHA in time');
//     }

//     // 3. Inject token into page and submit
//     await driver.executeScript(`
//       document.querySelector('#g-recaptcha-response').style.display = 'block';
//       document.querySelector('#g-recaptcha-response').value = arguments[0];
//     `, token);

//     // Some sites require dispatching the event after changing textarea
//     await driver.executeScript(`
//       const recaptchaResponse = document.querySelector('#g-recaptcha-response');
//       recaptchaResponse.dispatchEvent(new Event('change', { bubbles: true }));
//     `);

//     // await driver.findElement(By.id('recaptcha-demo-submit')).click();
//     // console.log('Form submitted.');

//     const submitButtons = await driver.findElements(By.xpath("//button[contains(text(),'Check') or contains(text(),'submit')]"));
//         if (submitButtons.length > 0) {
//         await submitButtons[0].click();
//         console.log('✅ Button clicked successfully.');
//         } else {
//         console.log('⚠️ No button with text "Check" or "Submit" found. Maybe it auto-submitted.');
//         }

//     // Wait for success page or confirmation
//     await driver.wait(until.titleContains('Success'), 15000);
//     console.log('✅ Success page loaded.');

//   } catch (err) {
//     console.error('❌ Error:', err.message);
//   } finally {
//     setTimeout(() => driver.quit(), 5000);
//   }
// })();