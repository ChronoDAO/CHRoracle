import LoadingComponent from "@/components/loading/loading";

export default function Loading() {
  const searchUser = " with the results of your search...";

  return <LoadingComponent page={searchUser} />;
}
