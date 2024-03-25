import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
  Flex,
} from "@mantine/core";
import React, { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const Login = ({ onLogin }) => {
  console.log("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("")

    // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const handleSignin = async() => {
    console.log("singin clicked");
    console.log(userName);
    console.log(password);
    setIsLoading(true);
    try {
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

      console.log("response", response);

      if (response.data.message === "Login successful") {
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

        const abc = localStorage.getItem("user")
        console.log("user", abc)

        console.log(userEmail, userFirstname);

        notifications.show({
          title: "Login Success",
          message: "Login Successful: Welcome back! ",
          color: "teal",
        });
        // const delay = 700; // Adjust the delay as needed
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, delay);
        onLogin(domainVersion);
      } else {
        setIsLoading(false);
        // You can show an error message here or handle unsuccessful login
        console.log("Invalid credentials");
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

  return (
    <div className="App" style={{ width: "100%" }}>
      <Container size={420} my={40}>
        <Flex
          mih={50}
          direction="column"
          justify="center"
          align="center"
          flex={1}
        >
          <Image w={60} src="../src/assets/ManavLogo2021.png" />
        </Flex>

        <Title ta="center">Welcome to R-FERM</Title>

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
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" bg="teal" onClick={handleSignin}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
