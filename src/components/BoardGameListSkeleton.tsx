import React from "react";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type Props = {};

const BoardGameCardSkeleton = () => {
  return (
    <div className="w-44 p-4 space-x-2 space-y-2 border rounded-md flex flex-col items-center">
      <Skeleton className="w-[125px] h-[150px]" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
};

const BoardGameListSkeleton = () => {
  return (
    <section className="py-4">
      <h2 className="text-base font-semibold mb-4">Board game discounts</h2>
      <div className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <BoardGameCardSkeleton key={i} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default BoardGameListSkeleton;
