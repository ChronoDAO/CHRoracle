'use client';
import React from "react";
import PieChart from "../charts/pieChart";

interface OwnerGrouped {
  ownerName: string;
  _count: {
    ownerName: number;
  };
}

interface ChartData {
  name: string;
  value: number;
}

interface Props {
  rawData: OwnerGrouped[];
  total: number;
}

const OwnersPieChart: React.FC<Props> = ({ rawData, total }) => {
  const totalNFTs: number = total;
  const ownersDataForPieChart: ChartData[] = rawData
    .map((ownerGrouped: OwnerGrouped) => ({
      name: ownerGrouped.ownerName,
      value: ownerGrouped._count.ownerName,
    }))
    .sort((a: ChartData, b: ChartData) => b.value - a.value);

  return (

      <PieChart chartData={ownersDataForPieChart} />

  );
};

export default OwnersPieChart;