import React from "react";
import HomeRferm from "../Rferm_pages/HomeRferm";
import PitDetails from "../Rferm_pages/PitDetails";
import Settings from "../Settings";
import Maintenace from "../Maintenace";
import Earthpit_data from "../Earthpit_data";
import RfermUsers from "../Rferm_pages/RfermUsers";

import { Routes, Route } from "react-router-dom";

const RouterSwitcherRferm: React.FC<{ backcolor: string }> = ({
  backcolor,
}) => {
  return (
    <Routes>
      <Route path="/" element={<HomeRferm back={backcolor} />} />
      <Route path="/details" element={<PitDetails back={backcolor} />} />
      <Route path="/users" element={<RfermUsers back={backcolor} />} />
      <Route path="/settings" element={<Settings back={backcolor} />} />
      <Route path="/maintenance" element={<Maintenace back={backcolor} />} />
      <Route path="/earthpit" element={<Earthpit_data back={backcolor} />} />
    </Routes>
  );
};

export default RouterSwitcherRferm;
