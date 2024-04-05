import { useEffect, useState } from "react";

interface BatteryData {
  x: string;
  y: number;
}

const useBatteryCal = ({ data }: { data?: BatteryData[] }) => {
  const [totalBatteryCount, setTotalBatteryCount] = useState(0);

  useEffect(() => {
    if (!data) return;
    const calculatePercentage = () => {
      data.forEach((row) => {
        const battery = row.y;
        const roundedPercentage = (battery / 14) * 100;
        setTotalBatteryCount(Number(roundedPercentage.toFixed(0)));
      });
    };
    calculatePercentage();
  }, [data]);

  return { totalBatteryCount };
};

export default useBatteryCal;
