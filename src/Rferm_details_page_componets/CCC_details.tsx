import { Card, Grid, Title, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import DetailsMap from "../components/Rferm_page_components/Rferm_special_componts/DetailsMap";
// import { Map_data } from "../components/testingData/Map_data";
// import { Details_page } from "../components/testingData/Details_page";
import Detials_table from "../components/Rferm_page_components/Rferm_special_componts/Details_table";
import axios from "axios";
import Rferm_SCC_cards from "../components/Rferm_page_components/Rferm_special_componts/Rferm_SCC_cards";
import { getTextColor } from "../components/utils";

const CCC_details: React.FC<{ back: string }> = ({ back }) => {
  const [selectedMacId, setSelectedMacId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  const [mapData, setMapData] = useState<any[]>([]);
  const [selectPinData, setPinData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Details_page", back);

  const persona = localStorage.getItem("persona");
  const useremail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.post("/api/rferm/mapdata", {
          email: useremail,
          persona: persona,
        });
        setMapData(response.data.data);
        console.log("mapData", response.data.data);
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1);
      } catch (error) {
        console.error("Error fetching map data:", error);
        // setIsLoading(false);
      }
    };

    fetchMapData();
  }, []);

  useEffect(() => {
    // Retrieve selectedMacId from local storage when the component mounts
    const storedMacId = localStorage.getItem("selectedMacId");
    const storedUsername = localStorage.getItem("slectedUserName");
    console.log("abcd");
    if (storedMacId) {
      setSelectedMacId(storedMacId);
      setSelectedUserName(storedUsername);
      // Optional: Clear the storedMacId from local storage after retrieving it
      // localStorage.removeItem("selectedMacId");
    }
    setIsLoading(true);
    const fetchData = async () => {
      try {
        console.log("efghS");
        const response = await axios.post("/api/rferm/persona/data", {
          email: storedMacId,
          persona: persona,
        });
        setPinData(response.data.data);
        console.log("selectedPinData-", response.data.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching map data:", error);
        setIsLoading(false);
      }
    };
    setSelectedMacId(storedMacId);
    setSelectedUserName(storedUsername);

    fetchData();
  }, [selectedMacId]);

  const {
    danger_count = 0,
    unhealthy_count = 0,
    healthy = 0,
    total = 0,
    danger_data = [],
    healthy_data = [],
    unhealthy_data = [],
  } = selectPinData[0] || {};

  if (danger_data.length === 0) {
    console.log("pin-data-", danger_data);
  }

  const totalData = [
    {
      title: "Danger",
      value: danger_count,
      description: "Pits",
    },
    {
      title: "Un-Healthy",
      value: unhealthy_count,
      description: "Pits ",
    },
    {
      title: "Healthy",
      value: healthy,
      description: "Pits ",
    },
    {
      title: "Total Pits",
      value: total,
      description: "Total ",
    },
  ];

  const handlePinClick = (macId: string) => {
    setSelectedMacId(macId);
    // Store selectedMacId in local storage
    localStorage.setItem("selectedMacId", macId);
    setSelectedUserName(localStorage.getItem("slectedUserName"));
  };

  console.log("macid-", selectedMacId);
  console.log("username-", selectedUserName);

  return (
    <>
      <div style={{ position: "relative" }}>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backdropFilter: "blur(2px)",
              backgroundColor: "rgba(255, 255, 255, 0.01)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader
              style={{
                position: "absolute",
                top: "250px",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        )}
        <Grid mt="xl">
          <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
            <Card withBorder radius="lg" shadow="lg">
              <DetailsMap data={mapData} onPinClick={handlePinClick} />
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
            <Title order={2} mb="xl" c={getTextColor(back)} ta="center">
              Data for SCC: {selectedUserName || "Please click on a pin"}
            </Title>
            {selectedMacId && <Rferm_SCC_cards data={totalData} />}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        </Grid>
        {selectedMacId && (
          <>
            {danger_data.length !== 0 && (
              <Grid mt="xl">
                <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
                <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
                  <Card withBorder radius="lg" shadow="lg">
                    <Title order={4} td="underline" mb="xl" mt="lg">
                      Danger Pit Data:
                    </Title>
                    <Detials_table data={danger_data} />
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
              </Grid>
            )}
            {unhealthy_data.length !== 0 && (
              <Grid mt="xl">
                <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
                <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
                  <Card withBorder radius="lg" shadow="xl">
                    <Title order={4} td="underline" mb="xl" mt="lg">
                      Unhealthy Pit Data:
                    </Title>
                    <Detials_table data={unhealthy_data} />
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
              </Grid>
            )}
            {healthy_data.length !== 0 && (
              <Grid mt="xl">
                <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
                <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
                  <Card withBorder radius="lg" shadow="lg">
                    <Title order={4} td="underline" mb="xl" mt="lg">
                      Healthy Pit Data:
                    </Title>
                    <Detials_table data={healthy_data} />
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
              </Grid>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CCC_details;
