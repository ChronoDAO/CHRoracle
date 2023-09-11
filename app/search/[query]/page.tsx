import Link from 'next/link';
import searchUser from '@/lib/prisma/searchUser';
import styles from './page.module.scss';

type Params = {
  params: {
    query: string;
  };
};

export default async function SearchResultPage({ params: { query } }: Params) {
  //@ts-ignore 
  const results = await searchUser(query);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Résultats de recherche pour : {query}</h1>

      <ul className={styles.userList}>
        {results.map((result) => (
          <li className={styles.userItem} key={result.id}>
            <Link href={`/users/${encodeURIComponent(result.name)}`} passHref>
              <span className={styles.userLink}>
                {result.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


