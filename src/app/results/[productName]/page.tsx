"use client";

import BoardGameList from "@/components/BoardGameList";
import { Store } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { scrapeStores } from "@/lib/scraper";
import { stores } from "@/lib/scraper/stores";
import { useEffect, useState } from "react";
import BoardGameListSkeleton from "@/components/BoardGameListSkeleton";

type Props = {
  params: {
    productName: string;
  };
};

const ProductPage = ({ params }: Props) => {
  const [products, setProducts] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeLoading, setStoreLoading] = useState<string>("");

  useEffect(() => {
    async function startScraper() {
      for (const store of stores) {
        try {
          setIsLoading(true);
          setStoreLoading(store.name);
          const product = await scrapeStores(params.productName, store);
          if (product === undefined || product.products?.length == 0) continue;
          setProducts((prevProducts) => [...prevProducts, product]);
        } catch (error) {
          console.error("Error scraping store:", store.name, error);
        }
      }
      setIsLoading(false);
    }

    startScraper();
  }, []);

  return (
    <div>
      {isLoading || products.length > 0 ? (
        <h1 className="text-xl font-semibold mb-5 pt-10">
          Showing results for:{" "}
          {capitalize(decodeURIComponent(params.productName))}
        </h1>
      ) : (
        <h1 className="text-xl font-semibold mb-5 pt-10">
          Cannot find any results for:{" "}
          {capitalize(decodeURIComponent(params.productName))}
        </h1>
      )}
      <div>
        {products?.map(
          (store: Store, i: number) =>
            store.products && (
              <BoardGameList store={store} key={i}></BoardGameList>
            )
        )}
        {isLoading && (
          <div>
            <h2 className="text-base font-semibold">
              Fetching board games from:{" "}
              {storeLoading ? capitalize(storeLoading) : storeLoading}
              ...
            </h2>
            <BoardGameListSkeleton></BoardGameListSkeleton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
