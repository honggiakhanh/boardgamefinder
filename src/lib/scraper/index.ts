"use server";

import puppeteer from "puppeteer-core";
import { StoreSelector } from "../types";

const selectorTimeout = 5000; //ms

export const scrapeStores = async (
  productName: string,
  store: StoreSelector
) => {
  if (!productName || !store) return;

  let browser;
  let page;

  console.log(
    `Connecting to: wss://${process.env.BRIGHT_DATA_USERNAME}:${process.env.BRIGHT_DATA_PASSWORD}@${process.env.BRIGHT_DATA_HOST}`
  );

  try {
    browser = await puppeteer
      .connect({
        browserWSEndpoint: `wss://${process.env.BRIGHT_DATA_USERNAME}:${process.env.BRIGHT_DATA_PASSWORD}@${process.env.BRIGHT_DATA_HOST}`,
      })
      .catch((error) => {
        console.error("Browser connection failed:", error);
        throw error; // Re-throw to be caught by outer try-catch
      });

    page = await browser.newPage();

    // Set longer timeout for navigation
    await page.setDefaultNavigationTimeout(10000);

    console.log(`Navigating to ${store.name}...`);
    await page.goto(`${store.searchUrl}${productName}`, {
      waitUntil: "networkidle0", // Wait until network is idle
    });

    console.log(`Waiting for selector in ${store.name}...`);
    // Wait for selector with explicit timeout
    await Promise.race([
      page.waitForSelector(store.selectors.product, {
        timeout: selectorTimeout,
        visible: true, // Make sure element is visible
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Selector timeout")), selectorTimeout)
      ),
    ]);

    //scroll to get all lazy loaded images
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const delay = 20;

        const scrollInterval = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(scrollInterval);
            resolve(undefined);
          }
        }, delay);
      });
    });

    //extract product data
    const productData = await page.evaluate((store) => {
      const productItem = Array.from(
        document.querySelectorAll(store.selectors.product)
      );
      return productItem.map((item) => {
        const name =
          item
            .querySelector(store.selectors.product_name)
            ?.textContent?.trim() || "null";
        const price =
          item
            .querySelector(store.selectors.product_price)
            ?.textContent?.trim() || "null";
        const imageLink =
          item
            .querySelector(store.selectors.product_img)
            ?.getAttribute("src") || "null";
        const productLink =
          item
            .querySelector(store.selectors.product_link)
            ?.getAttribute("href") || "null";
        let fullImageLink, fullProductLink;
        try {
          fullImageLink = new URL(imageLink);
        } catch (error) {
          fullImageLink = new URL(imageLink, store.baseUrl);
        }
        try {
          fullProductLink = new URL(productLink);
        } catch (error) {
          fullProductLink = new URL(productLink, store.baseUrl);
        }
        return {
          name,
          price,
          fullImageLink: fullImageLink.href,
          fullProductLink: fullProductLink.href,
        };
      });
    }, store);

    if (store.name === "puolenkuunpelit") {
      productData?.shift();
    }

    return {
      store: store.name,
      products: productData,
    };
  } catch (error) {
    console.error(`Error scraping ${store.name}:`, error);
    return {
      store: store.name,
      products: [],
    };
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
  }
};
