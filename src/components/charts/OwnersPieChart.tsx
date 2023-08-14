import CustomPieChart from "./CustomPieChart";

const OwnersPieChart = ({ rawData, total }) => {
  const totalNFTs = total;
  const ownersDataForPieChart = rawData
    .map((ownerGrouped) => ({
      name: ownerGrouped.ownerName,
      value: ownerGrouped._count.ownerName,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div>
      <CustomPieChart chartData={ownersDataForPieChart} />
    </div>
  );
};

export default OwnersPieChart;
