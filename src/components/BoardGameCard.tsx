import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { BoardGame } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  boardgame: BoardGame;
};

const BoardGameCard = ({ boardgame }: Props) => {
  return (
    <Link href={boardgame.fullProductLink}>
      <Card className="w-44 p-4 text-wrap">
        <Image
          alt={boardgame.name}
          width={144}
          height={144}
          src={boardgame.fullImageLink}
          className="w-full h-36 object-cover rounded-sm mb-2"
        ></Image>
        <CardTitle className="text-md truncate" title={boardgame.name}>
          {boardgame.name}
        </CardTitle>
        <CardDescription className="text-md">
          € {boardgame.price}
        </CardDescription>
      </Card>
    </Link>
  );
};

export default BoardGameCard;
