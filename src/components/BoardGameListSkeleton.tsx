import React from "react";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type Props = {
  title?: string;
};

const BoardGameCardSkeleton = () => {
  return (
    <div className="w-44 p-2 space-y-2 border rounded-md flex flex-col items-center">
      <Skeleton className="w-36 h-36" />
      <div className="space-y-2 w-full px-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
};

const BoardGameListSkeleton = ({ title }: Props) => {
  return (
    <section className="py-4">
      {title && <h2 className="text-base font-semibold pb-4">{title}</h2>}
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
