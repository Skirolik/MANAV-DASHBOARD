import React, { useState } from "react";
import {
  AppShell,
  NavLink,
  ScrollArea,
  Button,
  Center,
  Text,
  useMantineColorScheme,
  useComputedColorScheme,
  Avatar,
  Image,
  Flex,
  Drawer,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconSettings,
  IconDetails,
  IconHome,
  IconPower,
  IconLayoutKanban,
  IconMapPin,
  IconUsersGroup,
  IconArrowBarRight,
} from "@tabler/icons-react";
import { getTextColor } from "../utils";

export const NavbarRferm = ({ Onlogout, back }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLargeScreen = useMediaQuery("(min-width:800px");
  const computedColorScheme = useComputedColorScheme("light");
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

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
            <AppShell.Section mt="lg">
              {" "}
              <Image
                height="100%"
                // width="0"
                src="../../src/assets/ManavLogo2021.png"
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
                style={{
                  color: pathname === "/" ? "#087f5b" : "inherit",
                  backgroundColor:
                    pathname === "/" ? "rgba(8, 127, 91, 0.1)" : "inherit",
                }}
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
                key="Detials"
                style={{
                  color: pathname === "/details" ? "#087f5b" : "inherit",
                  backgroundColor:
                    pathname === "/details"
                      ? "rgba(8, 127, 91, 0.1)"
                      : "inherit",
                }}
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
                onClick={() => navigate("../details")}
              />
              <NavLink
                key="users"
                className={`NavLink-custom ${
                  colorScheme === "light" ? "light" : "dark"
                }`}
                label={
                  <div style={{ textAlign: "center" }}>
                    <IconUsersGroup
                      width={20}
                      height={20}
                      style={{ marginBottom: "5px" }}
                    />
                    <Text
                      size="sm"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Users
                    </Text>
                  </div>
                }
                onClick={() => navigate("../details")}
              />
              <NavLink
                key="Maintenance"
                style={{
                  color: pathname === "/maintenance" ? "#087f5b" : "inherit",
                  backgroundColor:
                    pathname === "/maintenance"
                      ? "rgba(8, 127, 91, 0.1)"
                      : "inherit",
                }}
                label={
                  <div style={{ textAlign: "center" }}>
                    <IconLayoutKanban
                      width={20}
                      height={20}
                      style={{ marginBottom: "5px" }}
                    />
                    <Text
                      size="md"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Board
                    </Text>
                  </div>
                }
                onClick={() => navigate("../maintenance")}
              />
              <NavLink
                key="Layout"
                style={{
                  color: pathname === "/earthpit" ? "#087f5b" : "inherit",
                  backgroundColor:
                    pathname === "/earthpit"
                      ? "rgba(8, 127, 91, 0.1)"
                      : "inherit",
                }}
                label={
                  <div style={{ textAlign: "center" }}>
                    <IconMapPin
                      width={20}
                      height={20}
                      style={{ marginBottom: "5px" }}
                    />
                    <Text
                      size="md"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Layout
                    </Text>
                  </div>
                }
                onClick={() => navigate("../earthpit")}
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
                    style={{ cursor: "pointer" }}
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
          <AppShell.Navbar>
            <IconArrowBarRight
              onClick={toggleDrawer}
              style={{ color: getTextColor(back) }}
            />
            <Drawer
              opened={opened}
              onClose={toggleDrawer}
              position="right"
              padding="md"
              style={{ marginTop: 64 }}
            >
              <AppShell.Section>
                <NavLink
                  key="Home"
                  style={{
                    color: pathname === "/" ? "#087f5b" : "inherit",
                    backgroundColor:
                      pathname === "/" ? "rgba(8, 127, 91, 0.1)" : "inherit",
                  }}
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
                  key="Detials"
                  style={{
                    color: pathname === "/detials" ? "#087f5b" : "inherit",
                    backgroundColor:
                      pathname === "/details"
                        ? "rgba(8, 127, 91, 0.1)"
                        : "inherit",
                  }}
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
                    navigate("../details");
                    toggleDrawer();
                  }}
                />
                <NavLink
                  key="users"
                  style={{
                    color: pathname === "/details" ? "#087f5b" : "inherit",
                    backgroundColor:
                      pathname === "/details"
                        ? "rgba(8, 127, 91, 0.1)"
                        : "inherit",
                  }}
                  label={
                    <div style={{ textAlign: "center" }}>
                      <IconUsersGroup
                        width={20}
                        height={20}
                        style={{ marginBottom: "5px" }}
                      />
                      <Text
                        size="sm"
                        style={{ lineHeight: "1", fontSize: "0.8em" }}
                      >
                        Users
                      </Text>
                    </div>
                  }
                  onClick={() => {
                    navigate("../details");
                    toggleDrawer();
                  }}
                />
                <NavLink
                  key="Maintenance"
                  style={{
                    color: pathname === "/maintenance" ? "#087f5b" : "inherit",
                    backgroundColor:
                      pathname === "/maintenance"
                        ? "rgba(8, 127, 91, 0.1)"
                        : "inherit",
                  }}
                  label={
                    <div style={{ textAlign: "center" }}>
                      <IconLayoutKanban
                        width={20}
                        height={20}
                        style={{ marginBottom: "5px" }}
                      />
                      <Text
                        size="md"
                        style={{ lineHeight: "1", fontSize: "0.8em" }}
                      >
                        Board
                      </Text>
                    </div>
                  }
                  onClick={() => {
                    navigate("../maintenance");
                    toggleDrawer();
                  }}
                />
                <NavLink
                  key="Layout"
                  style={{
                    color: pathname === "/earthpit" ? "#087f5b" : "inherit",
                    backgroundColor:
                      pathname === "/earthpit"
                        ? "rgba(8, 127, 91, 0.1)"
                        : "inherit",
                  }}
                  label={
                    <div style={{ textAlign: "center" }}>
                      <IconMapPin
                        width={20}
                        height={20}
                        style={{ marginBottom: "5px" }}
                      />
                      <Text
                        size="md"
                        style={{ lineHeight: "1", fontSize: "0.8em" }}
                      >
                        Layout
                      </Text>
                    </div>
                  }
                  onClick={() => {
                    navigate("../earthpit");
                    toggleDrawer();
                  }}
                />
              </AppShell.Section>

              <AppShell.Section mt="xl">
                <Center>
                  <Avatar
                    color="teal"
                    radius="xl"
                    mt="xl"
                    onClick={() => {
                      navigate("../settings");
                      toggleDrawer();
                    }}
                    style={{ cursor: "pointer" }}
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
                  >
                    <IconPower stroke={2} />
                  </Button>
                </Center>
              </AppShell.Section>
            </Drawer>
          </AppShell.Navbar>
        </>
      )}
    </>
  );
};
