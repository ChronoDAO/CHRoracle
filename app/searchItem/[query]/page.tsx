import Link from "next/link";
import prisma from "../../../lib/prisma/prisma";
import ItemNotFound from "@/components/errors/itemNotFound";
import styles from "./page.module.scss";
import searchItems from "@/lib/prisma/searchItems";

type Params = {
  params: {
    query: string;
    archetypeid?: string;
  };
};

export default async function SearchResultPage({
  params: { query, archetypeid },
}: Params) {
  let results = [];

  if (archetypeid) {
    results = await prisma.item.findMany({
      where: {
        archetypeId: archetypeid,
      },
      include: {
        nfts: true,
      },
    });

    if (!results.length) {
      return <ItemNotFound archetypeId={archetypeid} />;
    }
  } else {
    results = await searchItems(query);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {archetypeid
          ? `Items for archetype ID: ${archetypeid}`
          : `Search results for items: ${query}`}
      </h1>
      <ul className={styles.itemList}>
        {results.map((item) => (
          <li className={styles.item} key={item.archetypeId}>
            <Link
              href={`/items/${encodeURIComponent(item.archetypeId)}`}
              passHref
            >
              <span className={styles.itemLink}>
                {item.name} - {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
