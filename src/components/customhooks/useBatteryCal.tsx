import { useEffect, useState } from "react";

interface BatteryData {
  x: string | number | Date;
  y: number;
  z: string;
}

const useBatteryCal = ({ data }: { data?: BatteryData[] }) => {
  console.log("Battery Data", data);
  const [nameCounts, setNameCounts] = useState<
    { name: string; totalCount: number }[]
  >([]);

  useEffect(() => {
    if (!data) return;

    const calculatePercentage = () => {
      const nameMap = new Map<string, number>();

      data.forEach((row) => {
        const battery = row.y;
        const name = row.z;

        if (!nameMap.has(name)) {
          // Calculate percentage only if the name is not already processed
          const roundedPercentage = (battery / 14) * 100;
          nameMap.set(name, Number(roundedPercentage.toFixed(0)));
        }
      });

      // Convert map to array of objects
      const nameCountsArray = Array.from(nameMap).map(([name, totalCount]) => ({
        name,
        totalCount,
      }));

      const newNameCountsJson = JSON.stringify(nameCountsArray);
      const existingNameCountsJson = JSON.stringify(nameCounts);
      if (newNameCountsJson !== existingNameCountsJson) {
        setNameCounts(nameCountsArray); // Update the state only if they are different
      }
    };

    calculatePercentage();
  }, [data]);

  return nameCounts;
};

export default useBatteryCal;
