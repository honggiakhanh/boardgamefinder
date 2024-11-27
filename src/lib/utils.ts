import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export async function xmlToJson(xml: string) {
  const { parseString } = require("xml2js");

  return new Promise((resolve, reject) => {
    parseString(
      xml,
      { explicitArray: false, mergeAttrs: true },
      (err: Error | null, result: Object | Object[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export function decodeHTMEntities(text: string): string {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}
