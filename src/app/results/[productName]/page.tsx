import { scrapeAndStoreProduct } from "@/lib/actions";
import React from "react";
import BoardGameList from "@/components/BoardGameList";
import { testBoardGames } from "@/lib/testBoardGames";

type Props = {
  params: {
    productName: string;
  };
};

const page = async ({ params }: Props) => {
  // const products = await scrapeAndStoreProduct(params.productName);
  const products = testBoardGames;
  return (
    <div>
      <div className="text-base mb-5">
        Showing results for: `{decodeURI(params.productName)}`
      </div>
      <div className="">
        {products?.map((store: any, i: number) => (
          <BoardGameList store={store} key={i}></BoardGameList>
        ))}
      </div>
    </div>
  );
};

export default page;
