import React from "react";
import { getTextColor } from "../components/utils";
import { Text } from "@mantine/core";
import PCC_details from "../Rferm_details_page_componets/PCC_details";
import SCC_details from "../Rferm_details_page_componets/SCC_details";
import CCC_details from "../Rferm_details_page_componets/CCC_details";

const PitDetails: React.FC<{ back: string }> = ({ back }) => {
  const username = localStorage.getItem("userFirstname");
  const persona = localStorage.getItem("persona");
  return (
    <div>
      <Text ta="center" fw={800} fz="xl" td="underline" c={getTextColor(back)}>
        {" "}
        Check out the Details, {username || "Guest"}
      </Text>
      {persona == "pcc" && <PCC_details />}
      {persona == "scc" && <SCC_details back={back} />}
      {persona == "ccc" && <CCC_details back={back} />}
    </div>
  );
};

export default PitDetails;
