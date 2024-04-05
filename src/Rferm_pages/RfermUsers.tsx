import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, Loader } from "@mantine/core";
import { getTextColor } from "../components/utils";
import UserTable from "../components/Rferm_page_components/Rferm_special_componts/UserTable";
import { UserTableProp } from "../components/Rferm_page_components/Rferm_special_componts/UserTable";
import Grid_resistance_table from "../components/Rferm_page_components/Rferm_special_componts/Grid_resistance_table";
import { GridData } from "../components/testingData/GridData";
import { GripTable } from "../components/Rferm_page_components/Rferm_special_componts/Grid_resistance_table";

const RfermUsers: React.FC<{ back: string }> = ({ back }) => {
  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;
  const [dataUserTable, setUserTable] = useState<UserTableProp[]>([]);
  const [dataGridTable, setGridTable] = useState<GripTable[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const username = localStorage.getItem("userFirstname");
  const persona = localStorage.getItem("persona");
  const useremail = localStorage.getItem("userEmail");
  const userplantname = localStorage.getItem("plantName");

  useEffect(() => {
    // Function to fetch data from backend API
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.post("/api/rferm/user/data", {
          email: useremail,
          persona: persona,
        });
        console.log("Data fetched successfully:", response.data.data);
        if (persona === "pcc") {
          setGridTable(response.data.data);
        } else {
          setUserTable(response.data.data);
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 10);
      } catch (error) {
        console.error("Error fetching map data:", error);
        setIsLoading(false);
      }
    };

    if (useremail && persona && userplantname) {
      fetchData(); // Call the function to fetch data when component mounts
    } else {
      console.warn("User data not available. Skipping API call.");
    }

    console.log("grid-", dataGridTable);
    console.log("user-", dataUserTable);
  }, []);

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <Text ta="center" fw={800} fz="xl" td="underline" c={getTextColor(back)}>
        {" "}
        Check out the Details, {username || "Guest"}
      </Text>

      {persona == "pcc" && <Grid_resistance_table data={GridData} />}
      {persona == "scc" && <UserTable data={dataUserTable} />}
      {persona == "ccc" && <UserTable data={dataUserTable} />}
    </div>
  );
};

export default RfermUsers;
