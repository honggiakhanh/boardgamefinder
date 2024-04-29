import Link from "next/link";
import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
import { BGG_HotBoardGame } from "@/lib/types";

type Props = {
  boardgame: BGG_HotBoardGame;
};

const BoardGameGeekCard = ({ boardgame }: Props) => {
  return (
    <Link href={`/results/${boardgame.name.value}`}>
      <Card className="w-44 p-4 text-wrap">
        <Image
          alt={boardgame.name.value}
          width={150}
          height={100}
          src={boardgame.thumbnail.value}
          className="object-contain rounded-sm mb-2"
        ></Image>
        <CardTitle className="text-md">{boardgame.name.value}</CardTitle>
        <CardDescription className="text-md">
          Ranking: {boardgame.rank}
        </CardDescription>
      </Card>
    </Link>
  );
};

export default BoardGameGeekCard;
