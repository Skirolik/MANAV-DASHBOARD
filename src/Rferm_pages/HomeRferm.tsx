import React, { useEffect, useState } from "react";
import { Loader, Title } from "@mantine/core";
import axios from "axios";
import { getTextColor } from "../components/utils";
import PCC_user, {
  RfermHomeData,
} from "../components/Rferm_page_components/PCC_user";
import SCC_user from "../components/Rferm_page_components/SCC_user";
import CCC_user from "../components/Rferm_page_components/CCC_user";
// import { Rferm_home } from "../components/testingData/Rferm_home";

const HomeRferm: React.FC<{ back: string }> = ({ back }) => {
  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RfermHomeData[]>([]);

  const username = localStorage.getItem("userFirstname");
  const persona = localStorage.getItem("persona");
  const useremail = localStorage.getItem("userEmail");
  const userplantname = localStorage.getItem("plantName");

  useEffect(() => {
    // Function to fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/rferm/home", {
          email: useremail,
          persona: persona,
          plantName: userplantname,
        });

        setData(response.data.data);
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
    <div className="App" style={{ marginTop: 20 }}>
      <Title order={2} td="underline" c={getTextColor(back)} ta="center">
        Welcome, {username || "Guest"}{" "}
      </Title>
      {persona === "pcc" && <PCC_user data={data} back={back} />}
      {persona === "scc" && <SCC_user data={data} back={back} />}
      {persona === "ccc" && <CCC_user data={data} back={back} />}
    </div>
  );
};

export default HomeRferm;
