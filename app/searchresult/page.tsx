
import { useRouter } from 'next/router';
import searchUser from '@/lib/prisma/searchUser';

export default async function SearchResultPage  ()  {
    const router = useRouter();
    const { searchQuery } = router.query;
    //@ts-ignore 
  const results = await searchUser(searchQuery);
    return (
      <div>
        <h1>Search Results for: {searchQuery}</h1>
        
        {/* Render search results */}
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
   