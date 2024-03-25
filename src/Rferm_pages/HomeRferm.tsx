import { Text } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { getTextColor } from "../components/utils";

const HomeRferm = ({ back }) => {
  const location = useLocation();
  const { state } = location;
  const username = localStorage.getItem("user");
  return (
    <div className="App" style={{ marginTop: 10 }}>
      <Text ta="center" fw={800} fz="xl" td="underline" c={getTextColor(back)}>
        {" "}
        Welcome,{username || "Guest"}
      </Text>
    </div>
  );
};

export default HomeRferm;
