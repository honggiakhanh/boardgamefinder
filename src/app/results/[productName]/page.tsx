"use client";

import BoardGameList from "@/components/BoardGameList";
import { Store } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { scrapeStores } from "@/lib/scraper";
import { stores } from "@/lib/scraper/stores";
import { useEffect, useState } from "react";

type Props = {
  params: {
    productName: string;
  };
};

const ProductPage = ({ params }: Props) => {
  const [products, setProducts] = useState<Store[]>([]);

  useEffect(() => {
    async function startScraper() {
      for (const store of stores) {
        try {
          const product = await scrapeStores(params.productName, store);
          if (product === undefined || product.products?.length == 0) continue;
          setProducts((prevProducts) => [...prevProducts, product]);
        } catch (error) {
          console.error("Error scraping store:", store.name, error);
        }
      }
    }

    startScraper();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-5 pt-10">
        Showing results for: {capitalize(decodeURI(params.productName))}
      </h1>
      <div>
        {products?.map(
          (store: Store, i: number) =>
            store.products && (
              <BoardGameList store={store} key={i}></BoardGameList>
            )
        )}
      </div>
    </div>
  );
};

export default ProductPage;
