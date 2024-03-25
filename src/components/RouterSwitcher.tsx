import React from "react";
import Login from "../Login";
import HomeCommon from "../CommonPages/HomeCommon";
import Meseha from "../CommonPages/Meseha";
import { Routes, Route } from "react-router-dom";

const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeCommon />} />
      <Route path="/meseha" element={<Meseha />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RouterSwitcher;
