document.getElementById('runBtn').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  const inUrl = document.getElementById('inUrl').value.trim();
  const resUrl = document.getElementById('resUrl').value.trim();

  if (!apiKey || !inUrl || !resUrl) {
    alert("Please fill in all fields.");
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: solveCaptcha,
    args: [apiKey, inUrl, resUrl]
  }, (result) => {
    if (chrome.runtime.lastError) {
      console.error("❌ Error:", chrome.runtime.lastError.message);
    } else {
      console.log("✅ Script executed:", result);
    }
  });
});

function solveCaptcha(apiKey, inUrl, resUrl) {
 
  (async () => {
    console.log("🔍 Solving CAPTCHA using:", apiKey, inUrl, resUrl);

    const SITE_KEY = document.querySelector('.g-recaptcha')?.getAttribute('data-sitekey');
    const TARGET_URL = window.location.href;

    if (!SITE_KEY) {
      console.error('❌ CAPTCHA site key not found on page.');
      return;
    }

    const getJSON = async (url, params) => {
      const fullUrl = url + '?' + new URLSearchParams(params).toString();
      const response = await fetch(fullUrl);
      return await response.json();
    };

    try {
      console.log("📤 Submitting CAPTCHA to solver...");
      const submitRes = await getJSON(inUrl, {
        key: apiKey,
        method: 'userrecaptcha',
        googlekey: SITE_KEY,
        pageurl: TARGET_URL,
        json: 1
      });

      if (submitRes.status !== 1) {
        console.error("❌ Failed to submit CAPTCHA:", submitRes.request);
        return;
      }

      const requestId = submitRes.request;
      console.log("🆔 Request ID:", requestId);

      let token = null;

      for (let i = 0; i < 20; i++) {
        const delay = i < 4 ? 5000 : 10000; // Fast at start (5s), then slower (10s)
        console.log(`⏳ Polling (${i + 1}) after ${delay / 1000}s...`);
        await new Promise(r => setTimeout(r, delay));

        const res = await getJSON(resUrl, {
          key: apiKey,
          action: 'get',
          id: requestId,
          json: 1
        });

        if (res.status === 1) {
          token = res.request;
          console.log("✅ CAPTCHA solved:", token);
          break;
        } else if (res.request !== 'CAPCHA_NOT_READY') {
          console.error("❌ Solver returned error:", res.request);
          return;
        }
      }

      if (!token) {
        console.error("❌ CAPTCHA not solved in time.");
        return;
      }

       function injectCaptchaToken(token) {
    let textarea = document.querySelector('#g-recaptcha-response');
    if (!textarea) {
      console.warn("Creating #g-recaptcha-response manually.");
      textarea = document.createElement('textarea');
      textarea.id = 'g-recaptcha-response';
      textarea.name = 'g-recaptcha-response';
      textarea.style.display = 'none';
      document.body.appendChild(textarea);
    }
    textarea.style.display = 'block';
    textarea.value = token;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    console.log("✅ Token injected into #g-recaptcha-response");
  }
  (async () => {

    injectCaptchaToken(token);

    const btns = Array.from(document.querySelectorAll('button')).filter(btn =>
      /submit|check/i.test(btn.textContent)
    );

    if (btns.length > 0) {
      btns[0].click();
      console.log("✅ Clicked submit/check button.");
    } else {
      console.log("⚠️ No suitable submit/check button found.");
    }
    })();

     } catch (err) {
      console.error("❌ CAPTCHA solve failed:", err);
    }
  })();
}

