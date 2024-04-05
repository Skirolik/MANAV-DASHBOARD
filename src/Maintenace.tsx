import React from "react";
import Models from "./components/kanban_board/Models";
import { Text } from "@mantine/core";
import { getTextColor } from "./components/utils";

const Maintenace: React.FC<{ back: string }> = ({ back }) => {
  return (
    <div>
      <Text c={getTextColor(back)}>Hi</Text>
      <Models />
    </div>
  );
};

export default Maintenace;
