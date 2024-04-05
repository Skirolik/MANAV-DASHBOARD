import { useEffect, useState } from "react";

interface Row {
  x: string;
  y: number;
}

const useVariablecount = ({ data }: { data?: Row[] }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!data) return;
    const calculateProgress = () => {
      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(currentDate.getDate() - 365);

      let count = 0;

      data.forEach((row) => {
        const date = new Date(row.x);

        if (date >= thirtyDaysAgo && date <= currentDate && row.y >= 1) {
          count++;
        }
      });
      setTotalCount(count);
      setProgress((count / data.length) * 100);
    };
    calculateProgress();
  }, [data]);
  return { totalCount, progress };
};

export default useVariablecount;
