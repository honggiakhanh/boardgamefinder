import { scrapeAndStoreProduct } from "@/lib/actions";
import React from "react";
import BoardGameList from "@/components/BoardGameList";
import { testBoardGames } from "@/lib/testBoardGames";
import { Store } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { scrapeProduct } from "@/lib/scraper";

type Props = {
  params: {
    productName: string;
  };
};

const page = async ({ params }: Props) => {
  const products = await scrapeProduct(params.productName);
  // const products = testBoardGames;
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

export default page;
