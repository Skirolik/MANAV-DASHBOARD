import React, { useState } from "react";
import {
  AppShell,
  NavLink,
  ScrollArea,
  Button,
  Center,
  Text,
  useMantineColorScheme,
  Avatar,
  Image,
  Flex,
  Drawer,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconDetails,
  IconHome,
  IconPower,
  IconArrowBarRight,
} from "@tabler/icons-react";

export const NavbarBoth: React.FC<{ Onlogout: () => void }> = ({
  Onlogout,
}) => {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width:800px");

  const [opened, setOpened] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const handleLogoutClick = () => {
    Onlogout();
  };
  const toggleDrawer = () => {
    setOpened((prevOpened) => !prevOpened);
  };

  return (
    <>
      {isLargeScreen ? (
        <>
          <AppShell.Navbar>
            <AppShell.Section mt="xl">
              {" "}
              <Image
                h="100%"
                w="75%"
                style={{
                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                src="./src/assets/ManavLogo2021.png"
              />{" "}
            </AppShell.Section>
            <AppShell.Section
              component={ScrollArea}
              my="md"
              scrollbars="y"
              mt="xl"
            >
              <NavLink
                key="Home"
                className={`NavLink-custom ${
                  colorScheme === "light" ? "light" : "dark"
                }`}
                label={
                  <div style={{ textAlign: "center" }}>
                    <IconHome
                      width={20}
                      height={20}
                      style={{ marginBottom: "5px" }}
                    />
                    <Text
                      size="sm"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Home
                    </Text>
                  </div>
                }
                onClick={() => navigate("../")}
              />
              <NavLink
                key="Meseha"
                className={`NavLink-custom ${
                  colorScheme === "light" ? "light" : "dark"
                }`}
                label={
                  <div style={{ textAlign: "center" }}>
                    <IconDetails
                      width={20}
                      height={20}
                      style={{ marginBottom: "5px" }}
                    />
                    <Text
                      size="sm"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Details
                    </Text>
                  </div>
                }
                onClick={() => navigate("../meseha")}
              />
            </AppShell.Section>
            <div style={{ position: "absolute", bottom: 30, width: "100%" }}>
              <AppShell.Section mt="xl">
                <Center>
                  <Avatar
                    color="teal"
                    radius="xl"
                    mt="xl"
                    onClick={() => navigate("../settings")}
                  >
                    Name
                  </Avatar>
                </Center>
                <Center mt="xl">
                  <Button
                    variant="light"
                    color="red"
                    size="compact-md"
                    onClick={handleLogoutClick}
                    style={{ cursor: "pointer" }}
                  >
                    <IconPower stroke={2} />
                  </Button>
                </Center>
              </AppShell.Section>
            </div>
          </AppShell.Navbar>
        </>
      ) : (
        <>
          <Flex>
            <IconArrowBarRight onClick={toggleDrawer} />
            <Drawer
              opened={opened}
              onClose={toggleDrawer}
              position="right"
              padding="md"
              style={{ marginTop: 64 }}
            >
              <NavLink
                key="Home"
                className={`NavLink-custom ${
                  colorScheme === "light" ? "light" : "dark"
                }`}
                label={
                  <div style={{ textAlign: "center" }}>
                    <IconHome
                      width={20}
                      height={20}
                      style={{ marginBottom: "5px" }}
                    />
                    <Text
                      size="sm"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Home
                    </Text>
                  </div>
                }
                onClick={() => {
                  navigate("../");
                  toggleDrawer();
                }}
              />
              <NavLink
                key="Meseha"
                className={`NavLink-custom ${
                  colorScheme === "light" ? "light" : "dark"
                }`}
                label={
                  <div style={{ textAlign: "center" }}>
                    <IconDetails
                      width={20}
                      height={20}
                      style={{ marginBottom: "5px" }}
                    />
                    <Text
                      size="sm"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Details
                    </Text>
                  </div>
                }
                onClick={() => {
                  navigate("../meseha");
                  toggleDrawer();
                }}
              />
            </Drawer>
          </Flex>
        </>
      )}
    </>
  );
};
