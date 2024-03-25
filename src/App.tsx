import React, { useState, useEffect } from "react";
import {
  AppShell,
  Modal,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarRferm } from "./components/navbars/NavbarRferm";
import { NavbarLmas } from "./components/navbars/NavbarLmas";
import { NavbarBoth } from "./components/navbars/NavbarBoth";
import RouterSwitcherRferm from "./components/RouterSwitcherRferm";
import RouterSwitcherLmas from "./components/RouterSwitcherLmas";
import RouterSwitcher from "./components/RouterSwitcher";
import Login from "./Login";
import Color_Swatch from "./components/Color_Swatch";
import { IconColorSwatch } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:800px");
  const [user, setUser] = useState("");
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = useState("#172B4d");
  const [modalOpened, setModalOpened] = useState(false);
  console.log("background color", backgroundColor);

  const getTextColor = (bgColor) => {
    // Convert the background color to RGB
    const rgb = hexToRgb(bgColor);
    // Calculate brightness using a standard formula
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    // Choose text color based on brightness
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  const hexToRgb = (hex) => {
    // Remove the hash if it's present
    hex = hex.replace(/^#/, "");
    // Parse the hex values into RGB components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("abcd",storedUser)
      setLoggedIn(true);
      setUser(storedUser);
    } else {
      navigate("/login"); // Redirect to login page if user is not logged in
    }
  }, [navigate]);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUser(user);
    localStorage.setItem("user", user);
    console.log("username", user)
    navigate("/");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser("");
    navigate("/login");
  };

  return (
    <div className="App" style={{ width: "100%" }}>
      <AppShell
        padding="md"
        navbar={{
          width: isLargeScreen ? 80 : 0,
        }}
      >
        {loggedIn && (
          <>
            {user === "Rferm" && (
              <NavbarRferm Onlogout={handleLogout} back={backgroundColor} />
            )}
            {user === "Lmas" && (
              <NavbarLmas Onlogout={handleLogout} back={backgroundColor} />
            )}
            {(user === "Rferm" || user === "Lmas") && (
              <AppShell.Main
                style={{
                  background:
                    computedColorScheme === "dark"
                      ? `linear-gradient(to bottom, ${backgroundColor} 10%, #1e1e1e 60%)`
                      : backgroundColor,
                }}
              >
                <Tooltip label=" Select Color">
                  <IconColorSwatch
                    stroke={2}
                    width={30}
                    height={30}
                    onClick={() => setModalOpened(true)}
                    style={{
                      cursor: "pointer",
                      marginLeft: "20px",
                      color: getTextColor(backgroundColor),
                    }}
                  />
                </Tooltip>
                <Modal
                  opened={modalOpened}
                  onClose={() => setModalOpened(false)}
                >
                  <Color_Swatch onSelect={setBackgroundColor} />
                </Modal>
                {user === "Rferm" && (
                  <RouterSwitcherRferm backcolor={backgroundColor} />
                )}
                {user === "Lmas" && (
                  <RouterSwitcherLmas backcolor={backgroundColor} />
                )}
              </AppShell.Main>
            )}
            {user === "both" && (
              <>
                <NavbarBoth Onlogout={handleLogout} />
                <AppShell.Main>
                  <RouterSwitcher />
                </AppShell.Main>
              </>
            )}
          </>
        )}
        {!loggedIn && (
          <AppShell.Main>
            <Login onLogin={handleLogin} />
          </AppShell.Main>
        )}
      </AppShell>
    </div>
  );
};

export default App;
