import React, { useState } from "react";
import {
  AppShell,
  NavLink,
  ScrollArea,
  Button,
  Center,
  Text,
  Avatar,
  Image,
  Drawer,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconDetails,
  IconHome,
  IconPower,
  IconLayoutKanban,
  IconMapPin,
  IconArrowBarRight,
} from "@tabler/icons-react";
import { getTextColor } from "../utils";

export const NavbarLmas: React.FC<{ Onlogout: () => void; back: string }> = ({
  Onlogout,
  back,
}) => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width:800px");

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
                      size="sm"
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
                    style={{ cursor: "pointer" }}
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
                  onClick={() => {
                    navigate("../"), toggleDrawer();
                  }}
                />
                <NavLink
                  key="Detials"
                  style={{
                    color: pathname === "/calendar" ? "#087f5b" : "inherit",
                    backgroundColor:
                      pathname === "/calendar"
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
                    navigate("../calendar"), toggleDrawer();
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
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("../settings");
                      toggleDrawer();
                    }}
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
            </Drawer>
          </AppShell.Navbar>
        </>
      )}
    </>
  );
};
