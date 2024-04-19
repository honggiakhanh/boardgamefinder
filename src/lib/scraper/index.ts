"use server";

import puppeteer from "puppeteer-core";
import { stores } from "./stores";
import { StoreSelector } from "../types";

const selectorTimeout = 3000; //ms

export const scrapeStores = async (
  productName: string,
  store: StoreSelector
) => {
  if (!productName || !store) return;

  let browser;
  //connect to bright data websocket endpoint
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${process.env.BRIGHT_DATA_USERNAME}:${process.env.BRIGHT_DATA_PASSWORD}@${process.env.BRIGHT_DATA_HOST}`,
    });
  } catch (error) {
    console.log("Failed to connect to browser: " + error);
  }
  //scrape starts here
  const page = await browser?.newPage();
  try {
    await page?.goto(`${store.searchUrl}${productName}`);
    console.log("Trying: " + store.name);
    await page?.waitForSelector(store.selectors.product, {
      timeout: selectorTimeout,
    });
  } catch (error) {
    console.log(`Can't find selector within timeout`);
    let response = {
      store: store.name,
      products: [],
    };
    return response;
  }
  //scroll to get all lazy loaded images
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
  //extract product data
  const productData = await page?.evaluate((store) => {
    const productItem = Array.from(
      document.querySelectorAll(store.selectors.product)
    );
    return productItem.map((item) => {
      const name =
        item.querySelector(store.selectors.product_name)?.textContent?.trim() ||
        "null";
      const price =
        item
          .querySelector(store.selectors.product_price)
          ?.textContent?.trim() || "null";
      const imageLink =
        item.querySelector(store.selectors.product_img)?.getAttribute("src") ||
        "null";
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
  //remove first item if store is puolenkuunpelit (always empty)
  if (store.name === "puolenkuunpelit") {
    productData?.shift();
  }
  let response = { store: store.name, products: productData };
  await page?.close();

  return response;
};
