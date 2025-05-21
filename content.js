chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "checkCaptcha") {
    const sitekey = document.querySelector('[data-sitekey]')?.getAttribute('data-sitekey');
    sendResponse({ sitekey });
  }
});