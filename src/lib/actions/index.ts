import { scrapeProduct } from "../scraper";

export async function scrapeAndStoreProduct(productName: string) {
  if (!productName) return;

  console.log(productName);
  try {
    let products = await scrapeProduct(productName as string);
    return products;
  } catch (error) {
    throw new Error(`Failed to scrape product: ${productName}`);
  }
}
