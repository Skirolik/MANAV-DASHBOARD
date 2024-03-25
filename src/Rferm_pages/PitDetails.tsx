import React from "react";
import { getTextColor } from "../components/utils";
import { Text } from "@mantine/core";

const PitDetails = ({ back }) => {
  return (
    <div>
      <Text ta="center" fw={800} fz="xl" td="underline" c={getTextColor(back)}>
        {" "}
        Here We will get the pit details
      </Text>
    </div>
  );
};

export default PitDetails;
