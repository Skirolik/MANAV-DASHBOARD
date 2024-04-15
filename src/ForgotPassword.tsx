import { useState } from "react";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Flex,
  rem,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";

import { IconAt, IconLock } from "@tabler/icons-react";

const ForgotPassword = () => {
  const [userName, setUserName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const handlePasswordReset = async () => {
    try {
      // Validate email format
      if (!validateEmail(userName)) {
        notifications.show({
          title: "Invalid Email",
          message: "Please enter a valid email address.",
          color: "red",
        });
        return; // Stop execution if email is invalid
      }

      setIsLoading(true);
      const response = await axios.post("/forgot-password", {
        email: userName,
      });
      if (response.data.message === "Password reset email sent.") {
        setIsLoading(false);
        console.log("api-", response.data);
        notifications.show({
          title: "Request sent.",
          message:
            "Password reset request sent successfully, please check your email.",
          color: "teal",
        });
      } else {
        setIsLoading(false);
        // You can show an error message here or handle unsuccessful login
        console.log("Invalid email");
        notifications.show({
          title: "Invalid Email",
          message: "Please check your email address.",
          color: "Red",
        });
      }
    } catch (error) {
      console.error("Password reset request failed:");
      // Handle any error messages or redirection logic here
      notifications.show({
        title: "Request failed.",
        message:
          "Password reset request failed. Please try again or contact support team. Thank you!",
        color: "red",
      });
    }
  };

  // Function to validate email format
  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "375px", position: "relative" }}>
        {" "}
        <Loader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  return (
    <Container size={420} my={40}>
      <Flex
        mih={50}
        direction="column"
        justify="center"
        align="center"
        flex={1}
      >
        <IconLock stroke={2} style={{ width: rem(56), height: rem(56) }} />
      </Flex>

      <Title ta="center">Forgot Password ?</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="xyz@xyz.com"
          rightSection={icon}
          required
          onChange={(event) => setUserName(event.target.value)}
        />

        <Group justify="space-between" mt="lg">
          {/* <Checkbox label="Remember me" /> */}
        </Group>
        <Button fullWidth mt="lg" bg="teal" onClick={handlePasswordReset}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
