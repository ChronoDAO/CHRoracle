import LoadingComponent from "@/components/loading/loading";

export default function Loading() {
  const searchPlayers = "with your searchresults...";

  return <LoadingComponent page={searchPlayers} />;
}
