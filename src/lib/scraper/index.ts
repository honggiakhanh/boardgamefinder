import puppeteer from "puppeteer-core";
import { stores } from "./stores";

export async function scrapeProduct(productName: string) {
  if (!productName) return;
  let browser;
  let response = [];
  let selectorTimeout = 2000;

  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${process.env.BRIGHT_DATA_USERNAME}:${process.env.BRIGHT_DATA_PASSWORD}@${process.env.BRIGHT_DATA_HOST}`,
    });
  } catch (error) {}

  for (const store of stores) {
    const page = await browser?.newPage();
    try {
      await page?.goto(`${store.searchUrl}${productName}`);
      console.log("Trying: " + store.name);
      await page?.waitForSelector(store.selectors.product, {
        timeout: selectorTimeout,
      });
    } catch (error) {
      console.log(`Can't find selector within timeout`);
      response.push({ store: store.name, products: [] });
      continue;
    }

    await page?.evaluate(async () => {
      await new Promise((resolve, reject) => {
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

    const productData = await page?.evaluate((store) => {
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
    response.push({ store: store.name, products: productData });
    await page?.close();
  }

  return response;
}
