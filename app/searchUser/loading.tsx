import LoadingComponent from "@/components/loading/loading";

export default function Loading() {
  const searchUsers = "with you results of your search...";

  return <LoadingComponent page={searchUsers} />;
}
