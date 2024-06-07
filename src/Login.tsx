import {
  TextInput,
  PasswordInput,
  // Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Image,
  Flex,
  Modal,
  // rem,
  Loader,
} from "@mantine/core";
import React, { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ForgotPassword from "./ForgotPassword";
// import { IconAt } from "@tabler/icons-react";
import "./App.css";
interface LoginProps {
  onLogin: (domainVersion: string, bgColorSelected: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const handleSignin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/login",
        {
          userName,
          password,
        },
        {
          withCredentials: true, // Include credentials (cookies) in cross-origin requests
        }
      );

      if (response.data.message === "Login successful") {
        setIsLoading(false);
        const {
          userEmail,
          userFirstname,
          userLastname,
          userCompany,
          plantName,
          domainVersion,
          persona,
          userStartDate,
          userEndDate,
          userBgColor,
        } = response.data.user;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", userEmail); // Store the email in session storage
        localStorage.setItem("userFirstname", userFirstname);
        localStorage.setItem("userLastname", userLastname);
        localStorage.setItem("userCompany", userCompany);
        localStorage.setItem("plantName", plantName);
        localStorage.setItem("user", domainVersion);
        localStorage.setItem("persona", persona);
        localStorage.setItem("userStartDate", userStartDate);
        localStorage.setItem("userEndDate", userEndDate);
        localStorage.setItem("selectedColor", userBgColor);

        const bgColorSelected = userBgColor;

        notifications.show({
          title: "Login Success",
          message: "Login Successful: Welcome back! ",
          color: "teal",
        });
        onLogin(domainVersion, bgColorSelected);
        // window.location.reload();
      } else {
        setIsLoading(false);

        notifications.show({
          title: "Invalid Credentials",
          message: "Please check your username and password.",
          color: "Red",
        });
      }
    } catch (error) {
      setIsLoading(false);
      notifications.show({
        title: "Request Failed",
        message: "Sorry server not responding, please try again",
        color: "Red",
      });
      console.error("Login failed:");
    }
  };

  // const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  return (
    <div className="App" style={{ position: "relative" }}>
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
      <Container size={420} my={40}>
        <Flex
          mih={100}
          direction="column"
          justify="center"
          align="center"
          flex={1}
        >
          <Image w={70} src="./src/assets/Mini_logo_4-removebg.png" />
        </Flex>

        <Title ta="center">Welcome to Manav</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Name"
            placeholder="user Name"
            required
            onChange={(event) => setUserName(event.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            onChange={(event) => setPassword(event.target.value)}
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            {/* <Checkbox label="Remember me" /> */}
            <Anchor component="button" size="sm" onClick={open}>
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleSignin}>
            Sign in
          </Button>
        </Paper>
      </Container>
      <Modal
        opened={opened}
        onClose={close}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <ForgotPassword />
      </Modal>
    </div>
  );
};

export default Login;
