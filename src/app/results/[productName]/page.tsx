"use client";

import BoardGameList from "@/components/BoardGameList";
import {
  BGG_FetchResultWithID,
  BGG_BoardGameInfoByID,
  Store,
} from "@/lib/types";
import { capitalize, xmlToJson } from "@/lib/utils";
import { scrapeStores } from "@/lib/scraper";
import { stores } from "@/lib/scraper/stores";
import { useEffect, useState } from "react";
import BoardGameListSkeleton from "@/components/BoardGameListSkeleton";
import BoardGameInfo from "@/components/BoardGameInfo";

type Props = {
  params: {
    productName: string;
  };
  searchParams: {
    id: string;
  };
};

const ProductPage = ({ params, searchParams }: Props) => {
  const [products, setProducts] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeLoading, setStoreLoading] = useState<string>("");

  const id = searchParams.id;
  const [boardGameInfo, setBoardGameInfo] =
    useState<BGG_BoardGameInfoByID | null>(null);

  useEffect(() => {
    async function startScraper() {
      const boardGameInfo = await fetch(
        `https://www.boardgamegeek.com/xmlapi2/thing?id=${id}&type=boardgame`
      );
      const body = await boardGameInfo.text();
      const result = (await xmlToJson(body)) as BGG_FetchResultWithID;

      setBoardGameInfo(result.items.item);

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
      {boardGameInfo ? (
        <BoardGameInfo id={id} boardGameInfo={boardGameInfo}></BoardGameInfo>
      ) : (
        <div>Getting board game info</div>
      )}
      {isLoading || products.length > 0 ? (
        <h1 className="text-xl font-semibold mb-5 pt-10">
          Showing best results for:{" "}
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
