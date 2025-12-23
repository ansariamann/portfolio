const { chromium } = require("playwright");
const fs = require("fs");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log("PAGE LOG:", msg.type(), msg.text());
  });

  page.on("pageerror", (err) => {
    console.error("PAGE ERROR:", err);
  });

  try {
    // Try to navigate and capture intermediate events
    const resp = await page.goto("http://localhost:3000", {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    console.log("Status:", resp && resp.status());

    // Wait a bit to allow client JS to run
    await page.waitForTimeout(3000);

    const html = await page.content();
    console.log("HTML length:", html.length);

    // Capture full page screenshot and a DOM snapshot
    await page.screenshot({ path: "page_screenshot.png", fullPage: true });
    fs.writeFileSync("page_html.html", html);
    console.log("Saved HTML and screenshot.");

    // Collect performance metrics
    const perf = await page.evaluate(() =>
      JSON.stringify(window.performance.timing || {})
    );
    fs.writeFileSync("page_perf.json", perf);
  } catch (e) {
    console.error("Script error:", e);
  } finally {
    await browser.close();
  }
})();
