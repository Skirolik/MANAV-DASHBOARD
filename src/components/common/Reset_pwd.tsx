import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Image,
  Card,
  useMantineTheme,
  Grid,
  Progress,
  Group,
  Center,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import axios from "axios";

function PasswordRequirement({ meets, label }) {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.9rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Text ml={7}>{label}</Text>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const Reset_pwd = () => {
  const [password, setPassword] = useInputState("");
  const [confirmPassword, setConfirmPassword] = useInputState("");
  const [passwordError, setPasswordError] = useState("");
  const { resetToken } = useParams();

  // Set the default base URL for Axios

  //   axios.defaults.baseURL = "http://52.172.4.41:7070";

  const strength = getStrength(password);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      try {
        const response = await axios.post(`/reset-password/${resetToken}`, {
          password,
        });
        // Check if the response contains an "error" property indicating a failed registration
        if (response.data.error) {
          setPasswordError(response.data.error); // Use the error message from the backend
        } else {
          console.log(response.data.message);
          if (response.data.message === "Password reset successful.") {
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Password reset failed:", error.message);
        setPasswordError("Password reset failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Paper p="lg">
          <Text fz="lg" fw={800} align="center" mb="md">
            LMAS : Password Reset
          </Text>

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            style={{ marginBottom: "1rem" }}
            value={password}
            onChange={setPassword}
            error={passwordError}
            required
          />
          <Group grow mt="xs" mb="md">
            <Progress
              styles={{ bar: { transitionDuration: "0ms" } }}
              value={password.length > 0 ? 100 : 0}
              color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
              size={4}
            />
          </Group>
          {checks}
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            style={{ marginBottom: "1rem" }}
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={passwordError}
            required
          />
          <Button
            type="submit"
            radius="xl"
            ml="xl"
            onClick={handlePasswordChange}
          >
            Reset Password
          </Button>
        </Paper>
      </Card>
    </div>
  );
};

export default Reset_pwd;
