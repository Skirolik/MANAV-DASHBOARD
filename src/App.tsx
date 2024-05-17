import { useState, useEffect } from "react";
import {
  AppShell,
  Modal,
  Tooltip,
  useComputedColorScheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { NavbarRferm } from "./components/navbars/NavbarRferm";
import { NavbarLmas } from "./components/navbars/NavbarLmas";
import { NavbarBoth } from "./components/navbars/NavbarBoth";
import RouterSwitcherRferm from "./components/RouterSwitcherRferm";
import RouterSwitcherLmas from "./components/RouterSwitcherLmas";
import RouterSwitcher from "./components/RouterSwitcher";
import Login from "./Login";
import "@mantine/charts/styles.css";
import Color_Swatch from "./components/Color_Swatch";
import { IconColorSwatch } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1200px");
  const [user, setUser] = useState("");
  const [navbarOpened] = useState(false);

  const computedColorScheme = useComputedColorScheme("dark");

  const backGroundColorFromStorage = localStorage.getItem("selectedColor");
  const defaultColor = "#FFFFFF";

  const [backgroundColor, setBackgroundColor] = useState<string>(
    backGroundColorFromStorage ? backGroundColorFromStorage : defaultColor
  );
  const [modalOpened, setModalOpened] = useState(false);
  console.log("background color", backgroundColor);

  const getTextColor = (bgColor: string) => {
    // Convert the background color to RGB
    const rgb = hexToRgb(bgColor);
    // Calculate brightness using a standard formula
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    // Choose text color based on brightness
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  const hexToRgb = (hex: string) => {
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
      setLoggedIn(true);
      setUser(storedUser);
    } else {
      navigate("/"); // Redirect to login page if user is not logged in
    }
  }, [navigate]);

  const handleLogin = (user: string, bgColorSelected: string) => {
    setLoggedIn(true);
    setUser(user);
    setBackgroundColor(bgColorSelected);
    navigate("/");
  };
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setUser("");
    navigate("/");
  };

  return (
    <AppShell
      padding="md"
      header={{ height: isLargeScreen ? 0 : 55 }}
      navbar={{
        width: 80,
        breakpoint: "lg",
        collapsed: { mobile: !navbarOpened },
      }}
    >
      {loggedIn && (
        <>
          {user === "Rferm" && <NavbarRferm Onlogout={handleLogout} />}
          {user === "Lmas" && (
            <NavbarLmas Onlogout={handleLogout} back={backgroundColor} />
          )}
          {(user === "Rferm" || user === "Lmas") && (
            <AppShell.Main
              style={{
                background:
                  computedColorScheme === "dark"
                    ? `linear-gradient(to bottom, ${backgroundColor} 2%, #1e1e1e 60%)`
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
              <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
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
  );
};

export default App;
