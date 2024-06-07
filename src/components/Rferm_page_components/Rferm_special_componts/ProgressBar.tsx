import { Progress } from "@mantine/core";
import React from "react";

interface ProgressBarDetail {
  value: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarDetail> = ({ value, color }) => {
  return (
    <>
      <Progress
        radius="xl"
        size="xl"
        value={value}
        animated
        color={color}
        mb="lg"
      />
    </>
  );
};

export default ProgressBar;
