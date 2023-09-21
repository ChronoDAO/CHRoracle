import React from "react";
import PlayerNameNotFound from "@/components/errors/playernameNotFound";
import { getPlayerHistory } from "@/lib/prisma/player-history";
import PlayerHistory from "@/components/generateTables/generatePlayerHistoryTables";
import PlayerCard from "@/components/PlayerInfo/playerInfoCard";

type Params = {
  params: {
    playername: string;
  };
};

export default async function Player({ params:  playername  }: Params) {
  const player:any= await getPlayerHistory(playername);
  if (!player) {
    return <PlayerNameNotFound playername={player.playername} />;
  }

  return (
    <>
      {/* @ts-ignore */}
      <PlayerCard  data={player} />
      {/* @ts-ignore */}
      <PlayerHistory data={player} />
      {/* <GeneratePlayerInventoryTable data={user} /> */}
      {/* @ts-ignore */}
    </>
  );
}
