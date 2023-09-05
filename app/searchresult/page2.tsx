'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

interface Props {}

interface User {
  id: number;
  name: string;
  nfts: any[];
  drops: any[];
  purchases: any[];
  balance: number;
}

const SearchResult: React.FC<Props> = () => {
    const [data, setData] = useState<{ userData: User | null; error: string | null }>({ userData: null, error: null });
    const searchParams = useSearchParams();
    const searchText = searchParams.get('searchText');
  
  useEffect(() => {
    if (searchText) {
      console.log('Search Text:', searchText);   
      fetch(`/lib/prisma/searchUser?searchText=${searchText}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [searchText]);

  const { userData, error } = data;

  return (
    <div>
      <h1>Résultats de la recherche pour : {userData ? userData.name : ''}</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {userData ? (
            <>
              <h2>Informations sur l'utilisateur</h2>
              <p>Nom : {userData.name}</p>
              <p>Solde : {userData.balance}</p>
              <h2>Achats</h2>
              {userData.purchases.map((purchase, index) => (
                <p key={index}>Achat #{index + 1}: ID: {purchase.id}, Date: {purchase.date}</p>
              ))}
              <h2>Drops</h2>
              {userData.drops.map((drop, index) => (
                <p key={index}>Drop #{index + 1}: ID: {drop.id}, Date: {drop.date}</p>
              ))}
              <h2>NFTs</h2>
              {userData.nfts.map((nft, index) => (
                <p key={index}>
                  NFT #{index + 1}:
                  ID: {nft.id},
                  Composed ID: {nft.composedId},
                  Issued ID: {nft.issuedId},
                  Loot Date: {nft.lootDate},
                  Owner Name: {nft.ownerName},
                  Archetype ID: {nft.archetypeId}
                </p>
              ))}
            </>
          ) : (
            <p>Aucune donnée utilisateur disponible</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;







