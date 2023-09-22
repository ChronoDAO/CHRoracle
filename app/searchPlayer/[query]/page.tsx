import Link from 'next/link';
import searchPlayer from '@/lib/prisma/searchPlayer';
import styles from './page.module.scss';

type Params = {
  params: {
    query: string;
  };
};

export default async function SearchResultPage({ params: { query } }: Params) {
  //@ts-ignore
  const results = await searchPlayer(query);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Search results : {query}</h1>

      <ul className={styles.playerList}>
        {results.map((result) => (
          <li className={styles.playerItem} key={result.id}>
            <Link href={`/players/${encodeURIComponent(result.name)}`} passHref>
              <span className={styles.playerLink}>
                {result.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


