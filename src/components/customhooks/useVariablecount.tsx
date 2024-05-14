import { useEffect, useState } from "react";

interface Row {
  x: string;
  y: number;
  z: string;
}

const useVariablecount = ({ data }: { data?: Row[] }) => {
  const [nameCounts, setNameCounts] = useState<
    { name: string; totalCount: number }[]
  >([]);

  useEffect(() => {
    if (!data) return;

    const calculateNameCounts = () => {
      const uniqueNames = Array.from(new Set(data.map((row) => row.z)));
      const counts: { name: string; totalCount: number }[] = [];

      uniqueNames.forEach((name) => {
        const nameData = data.filter((row) => row.z === name);
        let totalCount = 0;

        nameData.forEach((row) => {
          const currentDate = new Date();
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(currentDate.getDate() - 365);

          const date = new Date(row.x);

          if (date >= thirtyDaysAgo && date <= currentDate && row.y >= 1) {
            totalCount++;
          }
        });

        counts.push({ name, totalCount });
      });

      // Check if the new counts are different from the existing ones
      const newNameCountsJson = JSON.stringify(counts);
      const existingNameCountsJson = JSON.stringify(nameCounts);

      if (newNameCountsJson !== existingNameCountsJson) {
        setNameCounts(counts);
      }
    };

    calculateNameCounts();
  }, [data, nameCounts]); // Include nameCounts in dependencies array

  return nameCounts;
};

export default useVariablecount;
