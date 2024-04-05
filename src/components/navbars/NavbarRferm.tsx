import React, { useState } from "react";
import {
  AppShell,
  NavLink,
  ScrollArea,
  Button,
  Center,
  Avatar,
  Image,
  Drawer,
  Tooltip,
  Burger,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconDetails,
  IconHome,
  IconPower,
  IconLayoutKanban,
  IconMapPin,
  IconUsersGroup,
} from "@tabler/icons-react";

export const NavbarRferm: React.FC<{ Onlogout: () => void }> = ({
  Onlogout,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLargeScreen = useMediaQuery("(min-width:1200px");
  // const computedColorScheme = useComputedColorScheme("light");

  const name = localStorage.getItem("userFirstname") || "";
  const lastName = localStorage.getItem("userLastname") || "";

  console.log("name", lastName);

  const firstNameInitial = name.charAt(0).toUpperCase();
  const lastNameInitial = lastName.charAt(0).toUpperCase();
  const initials = `${firstNameInitial}${lastNameInitial}`;

  const [opened, setOpened] = useState(false);

  const handleLogoutClick = () => {
    Onlogout();
  };

  const toggleDrawer = () => {
    setOpened((prevOpened) => !prevOpened);
  };

  return (
    <>
      {!isLargeScreen && ( // Render only when the screen size is small
        <AppShell.Header style={{ display: isLargeScreen ? "none" : "flex" }}>
          <Burger
            mt="md"
            opened={opened}
            onClick={toggleDrawer}
            aria-label="Toggle navigation"
            aria-controls="navigation"
          />
        </AppShell.Header>
      )}
      <AppShell.Navbar>
        <Drawer
          opened={opened}
          onClose={toggleDrawer}
          id="navigation"
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
          <AppShell.Section mt="lg"> </AppShell.Section>
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
                  <Tooltip
                    label="Home"
                    position="right-end"
                    offset={10}
                    withArrow
                    arrowOffset={12}
                  >
                    <IconHome
                      width={25}
                      height={25}
                      style={{ marginBottom: "5px", marginTop: "10px" }}
                    />
                  </Tooltip>

                  {/* <Text
                      size="sm"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Home
                    </Text> */}
                </div>
              }
              onClick={() => navigate("../")}
            />
            <NavLink
              key="Detials"
              style={{
                color: pathname === "/details" ? "#087f5b" : "inherit",
                backgroundColor:
                  pathname === "/details" ? "rgba(8, 127, 91, 0.1)" : "inherit",
              }}
              label={
                <div style={{ textAlign: "center" }}>
                  <Tooltip
                    label="Pit Detials"
                    position="right-end"
                    offset={10}
                    withArrow
                    arrowOffset={12}
                  >
                    <IconDetails
                      width={25}
                      height={25}
                      style={{ marginBottom: "5px", marginTop: "10px" }}
                    />
                  </Tooltip>
                </div>
              }
              onClick={() => navigate("../details")}
            />
            <NavLink
              key="users"
              style={{
                color: pathname === "/users" ? "#087f5b" : "inherit",
                backgroundColor:
                  pathname === "/users" ? "rgba(8, 127, 91, 0.1)" : "inherit",
              }}
              label={
                <div style={{ textAlign: "center" }}>
                  <Tooltip
                    label="Users"
                    position="right-end"
                    offset={10}
                    withArrow
                    arrowOffset={12}
                  >
                    <IconUsersGroup
                      width={25}
                      height={25}
                      style={{ marginBottom: "5px", marginTop: "10px" }}
                    />
                  </Tooltip>
                </div>
              }
              onClick={() => navigate("../users")}
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
                  <Tooltip
                    label="Board"
                    position="right-end"
                    offset={10}
                    withArrow
                    arrowOffset={12}
                  >
                    <IconLayoutKanban
                      width={25}
                      height={25}
                      style={{ marginBottom: "5px", marginTop: "10px" }}
                    />
                  </Tooltip>
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
                  <Tooltip
                    label="Pit layout"
                    position="right-end"
                    offset={10}
                    withArrow
                    arrowOffset={12}
                  >
                    <IconMapPin
                      width={25}
                      height={25}
                      style={{ marginBottom: "5px", marginTop: "10px" }}
                    />
                  </Tooltip>
                </div>
              }
              onClick={() => navigate("../earthpit")}
            />
          </AppShell.Section>
          <div style={{ position: "absolute", bottom: 30, width: "100%" }}>
            <AppShell.Section mt="xl">
              <Center>
                <Tooltip
                  label={name}
                  position="right-end"
                  offset={5}
                  withArrow
                  arrowOffset={12}
                >
                  <Avatar
                    color="teal"
                    radius="xl"
                    mt="xl"
                    onClick={() => navigate("../settings")}
                    style={{ cursor: "pointer" }}
                  >
                    {initials}
                  </Avatar>
                </Tooltip>
              </Center>
              <Center mt="xl">
                <Tooltip
                  label="Logout"
                  position="right-end"
                  offset={5}
                  withArrow
                  arrowOffset={12}
                >
                  <Button
                    variant="light"
                    color="red"
                    size="compact-md"
                    onClick={handleLogoutClick}
                  >
                    <IconPower stroke={2} />
                  </Button>
                </Tooltip>
              </Center>
            </AppShell.Section>
          </div>
        </Drawer>
      </AppShell.Navbar>
      <AppShell.Navbar>
        <AppShell.Section mt="lg">
          {" "}
          <Image
            height="100%"
            // width="0"
            src="./src/assets/ManavLogo2021.png"
          />{" "}
        </AppShell.Section>
        <AppShell.Section component={ScrollArea} my="md" scrollbars="y" mt="xl">
          <NavLink
            key="Home"
            style={{
              color: pathname === "/" ? "#087f5b" : "inherit",
              backgroundColor:
                pathname === "/" ? "rgba(8, 127, 91, 0.1)" : "inherit",
            }}
            label={
              <div style={{ textAlign: "center" }}>
                <Tooltip
                  label="Home"
                  position="right-end"
                  offset={10}
                  withArrow
                  arrowOffset={12}
                >
                  <IconHome
                    width={25}
                    height={25}
                    style={{ marginBottom: "5px", marginTop: "10px" }}
                  />
                </Tooltip>

                {/* <Text
                      size="sm"
                      style={{ lineHeight: "1", fontSize: "0.8em" }}
                    >
                      Home
                    </Text> */}
              </div>
            }
            onClick={() => navigate("../")}
          />
          <NavLink
            key="Detials"
            style={{
              color: pathname === "/details" ? "#087f5b" : "inherit",
              backgroundColor:
                pathname === "/details" ? "rgba(8, 127, 91, 0.1)" : "inherit",
            }}
            label={
              <div style={{ textAlign: "center" }}>
                <Tooltip
                  label="Pit Detials"
                  position="right-end"
                  offset={10}
                  withArrow
                  arrowOffset={12}
                >
                  <IconDetails
                    width={25}
                    height={25}
                    style={{ marginBottom: "5px", marginTop: "10px" }}
                  />
                </Tooltip>
              </div>
            }
            onClick={() => navigate("../details")}
          />
          <NavLink
            key="users"
            style={{
              color: pathname === "/users" ? "#087f5b" : "inherit",
              backgroundColor:
                pathname === "/users" ? "rgba(8, 127, 91, 0.1)" : "inherit",
            }}
            label={
              <div style={{ textAlign: "center" }}>
                <Tooltip
                  label="Users"
                  position="right-end"
                  offset={10}
                  withArrow
                  arrowOffset={12}
                >
                  <IconUsersGroup
                    width={25}
                    height={25}
                    style={{ marginBottom: "5px", marginTop: "10px" }}
                  />
                </Tooltip>
              </div>
            }
            onClick={() => navigate("../users")}
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
                <Tooltip
                  label="Board"
                  position="right-end"
                  offset={10}
                  withArrow
                  arrowOffset={12}
                >
                  <IconLayoutKanban
                    width={25}
                    height={25}
                    style={{ marginBottom: "5px", marginTop: "10px" }}
                  />
                </Tooltip>
              </div>
            }
            onClick={() => navigate("../maintenance")}
          />
          <NavLink
            key="Layout"
            style={{
              color: pathname === "/earthpit" ? "#087f5b" : "inherit",
              backgroundColor:
                pathname === "/earthpit" ? "rgba(8, 127, 91, 0.1)" : "inherit",
            }}
            label={
              <div style={{ textAlign: "center" }}>
                <Tooltip
                  label="Pit layout"
                  position="right-end"
                  offset={10}
                  withArrow
                  arrowOffset={12}
                >
                  <IconMapPin
                    width={25}
                    height={25}
                    style={{ marginBottom: "5px", marginTop: "10px" }}
                  />
                </Tooltip>
              </div>
            }
            onClick={() => navigate("../earthpit")}
          />
        </AppShell.Section>
        <div style={{ position: "absolute", bottom: 30, width: "100%" }}>
          <AppShell.Section mt="xl">
            <Center>
              <Tooltip
                label={name}
                position="right-end"
                offset={5}
                withArrow
                arrowOffset={12}
              >
                <Avatar
                  color="teal"
                  radius="xl"
                  mt="xl"
                  onClick={() => navigate("../settings")}
                  style={{ cursor: "pointer" }}
                >
                  {initials}
                </Avatar>
              </Tooltip>
            </Center>
            <Center mt="xl">
              <Tooltip
                label="Logout"
                position="right-end"
                offset={5}
                withArrow
                arrowOffset={12}
              >
                <Button
                  variant="light"
                  color="red"
                  size="compact-md"
                  onClick={handleLogoutClick}
                >
                  <IconPower stroke={2} />
                </Button>
              </Tooltip>
            </Center>
          </AppShell.Section>
        </div>
      </AppShell.Navbar>
    </>
  );
};
