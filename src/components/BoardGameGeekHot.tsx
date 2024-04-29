import React from "react";
import { xmlToJson } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import BoardGameGeekCard from "./BoardGameGeekCard";

type Props = {};

type BGG_FetchResult = {
  items: {
    termsofuse: string;
    item: BGG_HotBoardGame[];
  };
};

type BGG_HotBoardGame = {
  id: string;
  rank: string;
  thumbnail: {
    value: string;
  };
  name: {
    value: string;
  };
  yearpublished: {
    value: string;
  };
};

const BoardGameGeekHot = async (props: Props) => {
  const response = await fetch(
    "https://www.boardgamegeek.com/xmlapi2/hot?type=boardgame"
  );
  const body = await response.text();
  const result = (await xmlToJson(body)) as BGG_FetchResult;

  return (
    <section className="py-4">
      <h2 className="text-base font-semibold pb-4">
        BoardGameGeek&apos;s Hot Board Games
      </h2>
      <div className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {result.items.item.map((product: BGG_HotBoardGame, i: number) => (
              <BoardGameGeekCard
                boardgame={product}
                key={i}
              ></BoardGameGeekCard>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default BoardGameGeekHot;
