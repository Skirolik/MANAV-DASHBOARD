import { useState } from "react";
import axios from "axios";
import {
  Paper,
  PasswordInput,
  Button,
  Text,
  Card,
  Progress,
  Group,
  Center,
  Loader,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface PasswordRequirementProps {
  meets: boolean; // Specify the type for the meets parameter
  label: string;
}

function PasswordRequirement({ meets, label }: PasswordRequirementProps) {
  return (
    <Text c={meets ? "green" : "red"} mt={5} size="sm">
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

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const Reset_pwd = () => {
  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = localStorage.getItem("userEmail");

  const [password, setPassword] = useInputState("");
  const [confirmPassword, setConfirmPassword] = useInputState("");
  const [passwordError, setPasswordError] = useState("");

  const strength = getStrength(password);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  const handlePasswordChange = async () => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setIsLoading(false);
      return;
    } else if (password === "") {
      setPasswordError("Field is required");
      setIsLoading(false);
      return;
    } else {
      try {
        console.log("Fetching data...");
        const response = await axios.post("/change-password", {
          email: userEmail,
          password: password,
        });

        if (response.data.message === "Password reset successful.") {
          setIsLoading(false);
          console.log("api-", response.data);
          notifications.show({
            title: "Password Change Successful",
            message: "Password chnaged successfully. Thank you!",
            color: "teal",
          });
          setPassword("");
          setConfirmPassword("");
          setPasswordError("");
        } else {
          setIsLoading(false);
          setPasswordError("");
          // You can show an error message here or handle unsuccessful login
          console.log("Password Change Failed");
          notifications.show({
            title: "Password Change Failed",
            message:
              "Request failed, please try again or contact the support team. Thank you!",
            color: "Red",
          });
        }
      } catch (error) {
        setIsLoading(false);
        setPasswordError("");
        console.error("Error sending client details", error);
        // Handle any error messages or redirection logic here
        notifications.show({
          title: "Request Failed",
          message:
            "Request failed, please contact the support team. Thank you!",
          color: "red",
        });
      }
    }
  };

  return (
    <div>
      <Card
        shadow="xl"
        padding="lg"
        radius="lg"
        withBorder
        style={{ minHeight: "510px" }}
      >
        <Paper p="md" style={{ boxShadow: "none" }} bg="transparent">
          <Text
            fz="xl"
            fw={800}
            // td="underline"
            ta="center"
            mb="xl"
            // mt="xl"
            tt="uppercase"
          >
            MANAV DASHBOARD : PASSWORD RESET
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
          <div style={{ textAlign: "center" }}>
            <Button
              type="submit"
              mt="md"
              // ml="xl"
              onClick={handlePasswordChange}
            >
              Reset Password
            </Button>
            {isLoading && (
              <Loader
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>
        </Paper>
      </Card>
    </div>
  );
};

export default Reset_pwd;
