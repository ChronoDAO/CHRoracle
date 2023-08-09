import prisma from '../../lib/prisma';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const sales = await prisma.sale.findMany({
    include: {
      from: true,
      to: true,
    },
  });

  const nodes: { id: string }[] = [];
  const links: { source: string; target: string }[] = [];

  sales.forEach((sale) => {
    const fromUser = sale.from;
    const toUser = sale.to;

    if (!nodes.some((node) => node.id === fromUser.name)) {
      nodes.push({ id: fromUser.name });
    }
    if (!nodes.some((node) => node.id === toUser.name)) {
      nodes.push({ id: toUser.name });
    }

    links.push({ source: fromUser.name, target: toUser.name });
  });

  return {
    props: {
      nodes,
      links,
    },
  };
};

export default getStaticProps;
