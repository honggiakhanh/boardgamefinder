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
    <Card className="w-full">
      <Image
        alt={boardgame.name}
        width={200}
        height={150}
        objectFit="contain"
        src={boardgame.fullImageLink}
      ></Image>
      <CardHeader>
        <Link href={boardgame.fullProductLink}>
          <CardTitle>{boardgame.name}</CardTitle>
        </Link>
        <CardDescription>€ {boardgame.price}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BoardGameCard;
