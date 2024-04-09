import React from "react";
import type { BoardGame, Store } from "@/lib/types";
import BoardGameCard from "./BoardGameCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type Props = {
  store: Store;
};

const BoardGameList = ({ store }: Props) => {
  return (
    store.products && (
      <section className="py-8">
        <h2 className="text-2xl font-semibold mb-4">From {store.store}</h2>
        <div className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {store.products.map((product: BoardGame, i: number) => (
                <BoardGameCard boardgame={product} key={i}></BoardGameCard>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    )
  );
};

export default BoardGameList;
