import {
  Button,
  Card,
  Flex,
  Grid,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { getTextColor } from "./components/utils";
import { CircleCheck, AlertCircle } from "tabler-icons-react";
import { notifications } from "@mantine/notifications";
import Reset_pwd from "./components/common/Reset_pwd";
import GetInTouch from "./components/common/GetInTouch";

const Settings = ({ back }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

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
  const [subscriptionStartDate, setSubscriptionStartDate] = useState(
    new Date("2023-07-15")
  );
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(
    new Date("2023-08-15")
  );
  const [daysRemaining, setDaysRemaining] = useState(0);

  const calculateDaysRemaining = () => {
    const currentTime = new Date();
    const remaingTime = subscriptionEndDate - currentTime;
    const remaingDays = Math.floor(remaingTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(remaingDays);
  };
  useEffect(() => {
    calculateDaysRemaining();
  }, []);

  const handleRenewSubscription = () => {
    notifications.show({
      title: "Request Sent ",
      message: "Thank You for, your subsription will be renewed",
      color: "teal",
      icon: <CircleCheck size={24} color="white" />,
    });
    console.log("Renew clicked");
  };

  return (
    <div className="App" style={{ marginTop: 30 }}>
      <Text ta="center" fw={800} fz="xl" td="underline" c={getTextColor(back)}>
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
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card
            shadow="xl"
            padding="lg"
            radius="md"
            withBorder
            style={contactDetailsStyle}
          >
            <Flex
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
              mt="xl"
            >
              <Text
                fz="xl"
                fw={800}
                td="underline"
                ta="center"
                mb="md"
                mt="xl"
                tt="uppercase"
              >
                Subscription Detials
              </Text>
              <Text ta="center" mt="xl" mb="xl">
                Subscription Start Date:{subscriptionStartDate.toDateString()}
              </Text>
              <Text ta="center" mt="xl" mb="xl">
                Subscription End Date:{subscriptionEndDate.toDateString()}
              </Text>
              <Text
                ta="center"
                style={{
                  color: daysRemaining < 30 ? "red" : "inherit",
                }}
              >
                Days Remaining for Subscription: {daysRemaining}
              </Text>
              <Button
                radius="xl"
                ml="xl"
                mt="xl"
                onClick={handleRenewSubscription}
                size="sm"
              >
                Renew
              </Button>
            </Flex>
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
