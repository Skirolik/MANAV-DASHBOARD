import React from "react";
import { getTextColor } from "../components/utils";
import { Title } from "@mantine/core";
import PCC_details from "../Rferm_details_page_componets/PCC_details";
import SCC_details from "../Rferm_details_page_componets/SCC_details";
import CCC_details from "../Rferm_details_page_componets/CCC_details";

const PitDetails: React.FC<{ back: string }> = ({ back }) => {
  const username = localStorage.getItem("userFirstname");
  const persona = localStorage.getItem("persona");
  return (
    <div>
      <Title order={2} td="underline" c={getTextColor(back)} ta="center">
        Welcome, {username || "Guest"}{" "}
      </Title>
      {persona == "pcc" && <PCC_details />}
      {persona == "scc" && <SCC_details back={back} />}
      {persona == "ccc" && <CCC_details back={back} />}
    </div>
  );
};

export default PitDetails;
