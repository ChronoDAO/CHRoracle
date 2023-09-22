import GeneratePlayersTable from "@/components/generateTables/generatePlayersTable";
import SearchBar from "@/components/Search/SearchBar";
import prisma from "@/lib/prisma/prisma";

export default async function players() {
  let players = await prisma.player.findMany();

  return (
    <div>
      <SearchBar searchPath="/searchPlayer" placeholderText="Enter player name" />
      <GeneratePlayersTable data={players} />
    </div>
  );
}
