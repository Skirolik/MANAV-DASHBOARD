import React from "react";
import LmasHome from "../LmasPages/LmasHome";
import Maintenace from "../Maintenace";
import Earthpit_data from "../Earthpit_data";
import Settings from "../Settings";

import { Routes, Route } from "react-router-dom";
import Smart_earthing from "../Smart_earthing";

const RouterSwitcherLmas: React.FC<{ backcolor: string }> = ({ backcolor }) => {
  return (
    <Routes>
      <Route path="/" element={<LmasHome back={backcolor} />} />
      <Route path="/maintenance" element={<Maintenace back={backcolor} />} />
      <Route path="/earthpit" element={<Earthpit_data back={backcolor} />} />
      <Route
        path="/smart_earthing"
        element={<Smart_earthing back={backcolor} />}
      />

      <Route path="/settings" element={<Settings back={backcolor} />} />
    </Routes>
  );
};

export default RouterSwitcherLmas;
