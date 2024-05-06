import React from "react";
import Models from "./components/kanban_board/Models";
import { Title } from "@mantine/core";
import { getTextColor } from "./components/utils";

const Maintenace: React.FC<{ back: string }> = ({ back }) => {
  localStorage.removeItem("selectedMacId");
  localStorage.removeItem("slectedUserName");
  return (
    <div>
      <Title order={2} td="underline" c={getTextColor(back)} ta="center">
        Maintenance Board
      </Title>
      <Models />
    </div>
  );
};

export default Maintenace;
