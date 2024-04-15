import React, { useState } from "react";
import {
  Grid,
  TextInput,
  Button,
  Card,
  Textarea,
  Accordion,
  Text,
  Select,
  useComputedColorScheme,
  Loader,
  Paper,
  // getPrimaryContrastColor,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { LoremIpsum } from "react-lorem-ipsum";
// import { getTextColor } from "../utils";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const GetInTouch: React.FC<{ back: string }> = ({}) => {
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const userEmail = localStorage.getItem("userEmail");
  const userFirstname = localStorage.getItem("userFirstname");
  const userLastname = localStorage.getItem("userLastname");
  const userCompany = localStorage.getItem("userCompany");

  const [message, setMessage] = useState("");
  const [product, setProduct] = useState("select");
  const [messageError, setMessageError] = useState("");
  const [productError, setProductError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
    setMessageError("");
  };

  const handleProductChange = (selectedValue: string) => {
    setProduct(selectedValue);
    setProductError("");
  };

  const handleSubmit = async () => {
    if (message !== "") {
      if (product === "select") {
        setProductError("Please select a product");
        return; // Exit the function early if product is not selected
      } else {
        setIsLoading(true);

        try {
          console.log("Fetching data...");
          const response = await axios.post("/contact-us", {
            email: userEmail,
            firstname: userFirstname,
            lastname: userLastname,
            company: userCompany,
            product,
            message,
          });

          if (response.data.message === "Request sent successfully.") {
            setIsLoading(false);
            console.log("api-", response.data);
            setMessage("");
            setProduct("select");
            setMessageError("");
            notifications.show({
              title: "Enquiry Sent",
              message:
                "One of our representatives will be in touch with you shortly. Thank you!",
              color: "teal",
            });
          } else {
            setIsLoading(false);
            // You can show an error message here or handle unsuccessful login
            console.log("Enquiry Failed");
            notifications.show({
              title: "Enquiry Failed",
              message:
                "Request failed, please contact the support team. Thank you!",
              color: "Red",
            });
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Error sending client details", error);
          // Handle any error messages or redirection logic here
          notifications.show({
            title: "Enquiry Failed",
            message:
              "Request failed, please contact the support team. Thank you!",
            color: "red",
          });
        }
      }
    } else {
      setMessageError("Please enter message");
      return;
    }
  };

  const computedColorScheme = useComputedColorScheme("light");
  const contactDetailsStyle = {
    background:
      computedColorScheme === "dark"
        ? "linear-gradient(45deg,#5f3dc4,#d0bfff)" // Dark mode gradient (light blue to violet)
        : "linear-gradient(45deg, #e7f5ff, #4dabf7)", // Light mode gradient (blue to light blue)
    color: computedColorScheme === "dark" ? "#ffff" : "#000000",
  };

  return (
    <div>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        {/* Contact details side */}

        {/* Form side */}
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card
            shadow="xl"
            padding="lg"
            radius="lg"
            withBorder
            style={{ minHeight: "520px" }}
          >
            <Paper p="md" style={{ boxShadow: "none" }}>
              <Text
                fz="xl"
                fw={800}
                // td="underline"
                ta="center"
                mb="xl"
                // mt="md"
                tt="uppercase"
              >
                CONTACT US
              </Text>

              <TextInput
                label="Full Name"
                value={`${userFirstname} ${userLastname}`}
                required
                mb="sm"
                disabled
              />
              <TextInput
                label="Email"
                value={userEmail ?? ""}
                type="email"
                disabled
                mb="sm"
                required
              />
              <Select
                // dropdownPosition="top"
                label="Product"
                placeholder="Select"
                searchable
                value={product}
                error={productError}
                mb="sm"
                onChange={(selectedValue) => {
                  if (typeof selectedValue === "string") {
                    handleProductChange(selectedValue);
                  }
                }}
                data={[
                  { value: "select", label: "Select One" },
                  { value: "LMAS", label: "LMAS" },
                  { value: "Smart Earthing", label: "Smart Earthing" },
                  { value: "R-FERM", label: "R-FERM" },
                  {
                    value: "Maintenance Assistance",
                    label: "Maintenance Assistance",
                  },
                  { value: "Order Placing", label: "Order Placing" },
                  { value: "Other", label: "Other" },
                ]}
                required
              />
              <Textarea
                label="Message"
                placeholder="Enter your message"
                value={message}
                style={{ marginBottom: "1rem" }}
                onChange={handleMessageChange}
                required
                mb="sm"
                error={messageError}
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  radius="xl"
                  // ml="xl"
                  // mb="md"
                  mt="md"
                  size="sm"
                  onClick={handleSubmit}
                  // loading={isLoading}
                >
                  Submit
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
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card
            shadow="xl"
            padding="lg"
            radius="lg"
            style={{ ...contactDetailsStyle, minHeight: "520px" }}
          >
            <Text
              fz="xl"
              fw={800}
              // td="underline"
              ta="center"
              mb="xl"
              mt="md"
              tt="uppercase"
            >
              CONTACT DETAILS
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                marginRight: "15px",
              }}
            >
              {/* <h2 style={{ textAlign: "center" }}>CONTACT DETAILS</h2> */}
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Address
                </Text>
                <Text style={{ textAlign: "left" }}>
                  : #28, PUNARVASU, 2nd & 3rd Floor, East End Main Road, 4th T
                  Block Jayanagar
                </Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  City
                </Text>
                <Text style={{ textAlign: "left" }}>: Bangalore</Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Country
                </Text>
                <Text style={{ textAlign: "left" }}>: India</Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Phone
                </Text>
                <Text style={{ textAlign: "left" }}>: +91 123-456-7890</Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Email
                </Text>
                <Text style={{ textAlign: "left" }}>
                  : info@manavenergy.com
                </Text>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Text style={{ minWidth: "125px", textAlign: "left" }} mb="md">
                  Working Hours
                </Text>
                <Text style={{ textAlign: "left" }}>: 09:30 AM - 06:30 PM</Text>
              </div>
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }} mb="xl">
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Text
              fz="xl"
              fw={800}
              // td="underline"
              ta="center"
              mb="xl"
              mt="md"
              tt="uppercase"
            >
              FAQ'S
            </Text>
            <Accordion
              transitionDuration={1000}
              variant="contained"
              radius="md"
              defaultValue="Question:1"
              chevron={<IconPlus size="1rem" />}
              styles={{
                chevron: {
                  "&[data-rotate]": {
                    transform: "rotate(45deg)",
                  },
                },
              }}
            >
              <Accordion.Item value="Question:1">
                <Accordion.Control>Question:1</Accordion.Control>
                <Accordion.Panel>
                  {" "}
                  <LoremIpsum p={2} />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="Question:2">
                <Accordion.Control>Question:2</Accordion.Control>
                <Accordion.Panel>
                  {" "}
                  <LoremIpsum p={2} />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="Question:3">
                <Accordion.Control>Question:3</Accordion.Control>
                <Accordion.Panel>
                  {" "}
                  <LoremIpsum p={2} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default GetInTouch;
