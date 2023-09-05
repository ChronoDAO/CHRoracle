import searchUser from '@/lib/prisma/searchUser';
type Params = {
  params: {
    query: string
  }
}
export default async function SearchResultPage  ({ params: { query }}: Params)  {
    //@ts-ignore 
  const results = await searchUser(query);
    return (
      <div>
        <h1>Search Results for: {query}</h1>
        
        {/* Render search results */}
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  