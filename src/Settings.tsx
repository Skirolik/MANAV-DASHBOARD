import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  ColorSwatch,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
  Loader,
} from "@mantine/core";
import { FaSun, FaMoon } from "react-icons/fa";
import { getTextColor } from "./components/utils";
// import { CircleCheck } from "tabler-icons-react";
import { notifications } from "@mantine/notifications";
import Reset_pwd from "./components/common/Reset_pwd";
import GetInTouch from "./components/common/GetInTouch";
import { IconPalette } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const Settings: React.FC<{ back: string }> = ({ back }) => {
  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const userEmail = localStorage.getItem("userEmail");
  const userDomain = localStorage.getItem("user");
  const userPersona = localStorage.getItem("persona");
  const userFirstname = localStorage.getItem("userFirstname");
  const userLastname = localStorage.getItem("userLastname");
  const userCompany = localStorage.getItem("userCompany");
  const userStartDate = localStorage.getItem("userStartDate");
  const userEndDate = localStorage.getItem("userEndDate");

  // Initialize subscription dates state with default values
  const [subscriptionStartDate, _setSubscriptionStartDate] = useState(
    userStartDate ? new Date(userStartDate) : new Date()
  );
  const [subscriptionEndDate, _setSubscriptionEndDate] = useState(
    userEndDate ? new Date(userEndDate) : new Date()
  );

  // Initialize loading state
  const [isLoading, setIsLoading] = useState(false);

  console.log("start-", userEmail);
  console.log("end-", userEndDate);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const [opened, { open, close }] = useDisclosure(false);

  const toggleColorScheme = () => {
    console.log("color Change");
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };
  const contactDetailsStyle = {
    background:
      computedColorScheme === "dark"
        ? "linear-gradient(45deg,#5f3dc4,#d0bfff)" // Dark mode gradient (light blue to violet)
        : "linear-gradient(45deg, #e7f5ff, #4dabf7)", // Light mode gradient (blue to light blue)
    color: computedColorScheme === "dark" ? "#ffff" : "#000000",
  };

  const [daysRemaining, setDaysRemaining] = useState(0);

  const calculateDaysRemaining = () => {
    const currentTime = new Date();
    const endDate = new Date(subscriptionEndDate);
    const remainingTime = endDate.getTime() - currentTime.getTime();
    const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(remainingDays);
  };
  useEffect(() => {
    calculateDaysRemaining();
  }, []);

  const handleRenewSubscription = async () => {
    setIsLoading(true);

    try {
      console.log("Fetching data...");
      const response = await axios.post("/renew-enquiry", {
        email: userEmail,
        firstname: userFirstname,
        lastname: userLastname,
        company: userCompany,
        startDate: userStartDate,
        endDate: userEndDate,
      });

      if (response.data.message === "Request sent successfully.") {
        setIsLoading(false);
        console.log("api-", response.data);
        notifications.show({
          title: "Renewal Request Sent",
          message:
            "One of our representatives will be in touch with you shortly. Thank you!",
          color: "teal",
        });
      } else {
        setIsLoading(false);
        // You can show an error message here or handle unsuccessful login
        console.log("Renewal Request Failed");
        notifications.show({
          title: "Renewal Request Failed",
          message:
            "Request failed, please contact the support team. Thank you!",
          color: "Red",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending client details", error);
      // Handle any error messages or redirection logic here
      notifications.show({
        title: "Renewal Request Failed",
        message: "Request failed, please contact the support team. Thank you!",
        color: "red",
      });
    }
  };

  const handleSelectColor = (color: string) => {
    console.log("color", color);
    localStorage.setItem("color", color);
    window.location.reload();
  };

  const handleResetColor = () => {
    localStorage.removeItem("color");
    window.location.reload();
  };

  const colors = [
    "red",
    "blue",
    "yellow",
    "violet",
    "grape",
    "lime",
    "teal",
    "orange",
    "indigo",
  ];

  return (
    <div className="App" style={{ marginTop: 30 }}>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Group justify="space-between">
            <Text fw={800} fz="xl" td="underline" c={getTextColor(back)}>
              Select Theme Color:{" "}
              <IconPalette
                stroke={2}
                onClick={open}
                style={{ cursor: "pointer" }}
              />
              <Modal opened={opened} onClose={close} title="Authentication">
                <Paper>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 2fr)",
                      gap: "4px",
                    }}
                  >
                    {colors.map((color) => (
                      <ColorSwatch
                        key={color}
                        color={color}
                        onClick={() => handleSelectColor(color)}
                        style={{ cursor: "pointer" }}
                      ></ColorSwatch>
                    ))}
                  </div>
                </Paper>
              </Modal>
            </Text>
            <Button onClick={handleResetColor}>Reset Theme</Button>

            <Text fw={800} fz="xl" td="underline" c={getTextColor(back)}>
              Choose the default color mode:{" "}
              <Button
                size="compact-md"
                ml="lg"
                // variant="link"
                onClick={toggleColorScheme}
              >
                {computedColorScheme === "dark" ? <FaSun /> : <FaMoon />}
              </Button>
            </Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card
            shadow="xl"
            padding="lg"
            radius="lg"
            withBorder
            style={{ ...contactDetailsStyle, minHeight: "510px" }}
          >
            <Text
              fz="xl"
              fw={800}
              // td="underline"
              ta="center"
              mb="xl"
              mt="md"
              tt="uppercase"
            >
              Subscription Details
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                marginRight: "15px",
                // gap: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Plant Name
                </Text>
                <Text style={{ textAlign: "left" }}>: {userCompany}</Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Product
                </Text>
                <Text tt="uppercase" style={{ textAlign: "left" }}>
                  : {userDomain}
                </Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Full Name
                </Text>
                <Text style={{ textAlign: "left" }}>
                  : {userFirstname} {userLastname}
                </Text>
              </div>
              {userDomain !== "Lmas" && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Text
                    style={{ minWidth: "125px", textAlign: "left" }}
                    mb="md"
                  >
                    Persona
                  </Text>
                  <Text tt="uppercase" style={{ textAlign: "left" }}>
                    : {userPersona}
                  </Text>
                </div>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Start Date
                </Text>
                <Text style={{ textAlign: "left" }}>
                  : {subscriptionStartDate.toDateString()}
                </Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  End Date
                </Text>
                <Text style={{ textAlign: "left" }}>
                  : {subscriptionEndDate.toDateString()}
                </Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Remaining
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    color: daysRemaining < 30 ? "red" : "inherit",
                  }}
                >
                  : {daysRemaining}
                </Text>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <Button
                radius="xl"
                mt="md"
                size="sm"
                // mt="xl"
                onClick={handleRenewSubscription}
              >
                Renew
              </Button>
              {isLoading && (
                <Loader
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Reset_pwd />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      <GetInTouch back={back} />
    </div>
  );
};

export default Settings;
