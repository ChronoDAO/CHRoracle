import LoadingComponent from "@/components/loading/loading";

export default function Loading() {
  const searchItem = "with you results of your search...";

  return <LoadingComponent page={searchItem} />;
}
