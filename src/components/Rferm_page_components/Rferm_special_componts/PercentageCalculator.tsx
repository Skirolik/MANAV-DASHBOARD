import React from "react";

import Percentage_chart_nivo from "./Percentage_chart_nivo";

interface PercentageCalculatorProps {
  dangerCount: number;
  unhealthyCount: number;
  healthyCount: number;
  totalCount: number;
}

const usePercentageCalculator = (
  dangerCount: number,
  unhealthyCount: number,
  healthyCount: number,
  totalCount: number
) => {
  const calculatePercentage = (value: number, total: number) => {
    return total !== 0 ? ((value / total) * 100).toFixed(2) : "0";
  };

  const dangerPercentage = parseFloat(
    calculatePercentage(dangerCount, totalCount)
  );
  const unhealthyPercentage = parseFloat(
    calculatePercentage(unhealthyCount, totalCount)
  );
  const healthyPercentage = parseFloat(
    calculatePercentage(healthyCount, totalCount)
  );

  return { dangerPercentage, unhealthyPercentage, healthyPercentage };
};

const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({
  dangerCount,
  unhealthyCount,
  healthyCount,
  totalCount,
}) => {
  const { dangerPercentage, unhealthyPercentage, healthyPercentage } =
    usePercentageCalculator(
      dangerCount,
      unhealthyCount,
      healthyCount,
      totalCount
    );
  const pieChartData = [
    { id: "Danger", label: "Danger", value: dangerPercentage },
    { id: "Unhealthy", label: "Unhealthy", value: unhealthyPercentage },
    { id: "Healthy", label: "Healthy", value: healthyPercentage },
  ];
  return (
    <>
      {/* <Percentage_chart data={pieChartData} /> */}
      <Percentage_chart_nivo data={pieChartData} />
    </>
  );
};

export default PercentageCalculator;
