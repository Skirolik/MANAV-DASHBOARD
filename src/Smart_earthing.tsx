import React from "react";
import Meseha from "./CommonPages/Meseha";
import { getTextColor } from "./components/utils";
import { Badge, Title } from "@mantine/core";

const Smart_earthing: React.FC<{ back: string }> = ({ back }) => {
  return (
    <div>
      <Title
        order={2}
        td="underline"
        c={getTextColor(back)}
        ta="center"
        mb="sm"
      >
        Smart Earthing <Badge variant="outline">Beta</Badge>
      </Title>
      <Meseha />
    </div>
  );
};

export default Smart_earthing;
