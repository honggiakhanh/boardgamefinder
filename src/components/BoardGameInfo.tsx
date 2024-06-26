import { BGG_BoardGameInfoByID } from "@/lib/types";
import _ from "lodash";
import Image from "next/image";

type Props = {
  id: string;
  boardGameInfo: BGG_BoardGameInfoByID;
};

const BoardGameInfo = ({ id, boardGameInfo }: Props) => {
  return (
    <div className="w-full mx-auto bg-card text-card-foreground shadow-md rounded-lg overflow-hidden flex px-4">
      <div className="relative w-1/3">
        <Image
          src={boardGameInfo.image}
          alt={boardGameInfo.name[0].value}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6 w-2/3">
        <h2 className="text-2xl font-bold mb-2">
          {boardGameInfo.name[0].value}
        </h2>
        <p className="text-muted-foreground mb-4">
          {boardGameInfo.description}
        </p>
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">
            <strong>Year Published:</strong> {boardGameInfo.yearpublished.value}
          </span>
          <span className="text-muted-foreground">
            <strong>Players:</strong> {boardGameInfo.minplayers.value} -{" "}
            {boardGameInfo.maxplayers.value}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">
            <strong>Playing Time:</strong> {boardGameInfo.playingtime.value}{" "}
            mins
          </span>
          <span className="text-muted-foreground">
            <strong>Age:</strong> {boardGameInfo.minage.value}+
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoardGameInfo;
