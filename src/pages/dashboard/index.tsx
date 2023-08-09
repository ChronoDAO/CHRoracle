import prisma from "../../lib/prisma";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  let user = await prisma.user.findFirst({
    where: {
      name: "Istarengwa",
    },
    include: {
      purchases: true,
    },
  });

  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      user,
    },
  };
};

export default function Dashboard({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let date = new Date(user.purchases[0].date);



  return (
    <>
      <div>
        <p>Nom: {user.name}</p>
        <p>ID :{user.id}</p>
        <p>Dépensé :{user.spent}Dollars </p>
        <p>Vendu :{user.sold}Dollars </p>
        <p>Vendu - Dépensé : {user.balance}Dollars </p>
        <p>Nb NFT acheté : {user.purchases.length}</p>
        <p>Date de premier achat: {date.getMonth()}</p>
      </div>
    </>
  );
}
