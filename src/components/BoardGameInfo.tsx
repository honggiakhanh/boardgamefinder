import { BGG_BoardGameInfoByID } from "@/lib/types";
import _ from "lodash";
import { xmlToJson } from "@/lib/utils";
import { useState } from "react";

type Props = {
  id: string;
  boardGameInfo: BGG_BoardGameInfoByID;
};

const BoardGameInfo = ({ id, boardGameInfo }: Props) => {
  return (
    <div>
      {boardGameInfo.name[0].value} - {id}
    </div>
  );
};

export default BoardGameInfo;
