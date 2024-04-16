import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Legned from "./Legned";
import Fault_chart from "./Fault_chart";
import { notifications } from "@mantine/notifications";
// import { Normal_fault } from "../../testingData/Normal_fault";
import {
  Button,
  Card,
  Flex,
  Group,
  Pagination,
  Table,
  Text,
  Title,
  Loader,
} from "@mantine/core";
import Grid_resistance_chart from "./Grid_resistance_chart";
import { DateInput } from "@mantine/dates";
import { IconCloudDownload } from "@tabler/icons-react";
import { CSVLink } from "react-csv";

const Scc_details_modal = ({ macid }: { macid: string | null }) => {
  console.log("Pit data in modal", macid);

  // Set the default base URL for Axios
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  const [pitDetails, setPitDetails] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [fault_value, _setFaultValue] = useState(true);
  const [resistance_value, _setResistanceValue] = useState(true);

  useEffect(() => {
    const fetchPitDetails = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.post("/api/rferm/pit/data", {
          macId: macid,
          fromDate: "",
          toDate: "",
        });

        setPitDetails(response.data.data);
        console.log("pit-details", response.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 10);
      } catch (error) {
        console.error("Error fetching map data:", error);
        setIsLoading(false);
      }
    };

    fetchPitDetails();
  }, []);

  const fetchPitDetailsFilter = useCallback(async () => {
    // Wrap in useCallback
    setIsLoading(true);
    try {
      if (!fromDate || !toDate) {
        notifications.show({
          title: "Request Failed",
          message: "Please select both 'Start Date' and 'End Date'",
          color: "Red",
        });
        setIsLoading(false);
        return;
      }
      console.log("Fetching data...");
      const response = await axios.post("/api/rferm/pit/data", {
        macId: macid,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      });

      setPitDetails(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching map data:", error);
      setIsLoading(false);
    }
  }, [fromDate, toDate, macid]); // Add dependencies

  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
    if (toDate && date && toDate < date) {
      setToDate(date); // Set To date same as From date if it's earlier
    }
  };
  const handleToggleClick = () => {
    fetchPitDetailsFilter();
  };

  const resistanceData = pitDetails.length > 0 ? pitDetails[0].resistance : [];
  const faultData = pitDetails.length > 0 ? pitDetails[0].fault : [];
  const warning_one = pitDetails.length > 0 ? pitDetails[0].warning_one : [];
  const warning_two = pitDetails.length > 0 ? pitDetails[0].warning_two : [];

  console.log("res-", resistanceData[0]);
  console.log("fau-", faultData[0]);
  console.log("war-1", resistance_value);
  console.log("war-2", fault_value);

  const { current_status, latest_reading, pit_name, updated_at } =
    pitDetails[0] || {};

  // const [value, setValue] = useState<Date | null>(null);

  // const [_showReadingUpdate, setShowReadingUpdate] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFault, setCurrentPageFault] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFaultPageChange = (newPages: number) => {
    setCurrentPageFault(newPages);
  };

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, resistanceData.length);
  const paginatedData = resistanceData.slice(startIndex - 1, endIndex);

  const endIndexFault = Math.min(
    currentPageFault * itemsPerPage,
    faultData.length
  );

  const paginatedDataFault = faultData.slice(startIndex - 1, endIndexFault);

  console.log("macid---------", macid);

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "500px", position: "relative" }}>
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
    <>
      <Title order={2} ta="center" td="underline">
        Details:
      </Title>
      <Card p="xl" mt="xl">
        <Card.Section>
          <Group justify="space-between">
            <Title order={4}>Pit Name: {pit_name}</Title>
            <Title order={4}>Current Status: {current_status}</Title>
            <Title order={4}>Last Update: {updated_at}</Title>
            <Title order={4}>Latest Reading: {latest_reading} Ω</Title>
          </Group>
        </Card.Section>
        <Group justify="center" ml="xl" mt="lg">
          <DateInput
            valueFormat="DD/MM/YYYY "
            // label="From:"
            placeholder="Start Date"
            value={fromDate}
            maxDate={new Date()}
            onChange={handleFromDateChange}
          />
          <Text mt="lg">To</Text>
          <DateInput
            valueFormat="DD/MM/YYYY "
            // label="To:"
            placeholder="End Date"
            value={toDate}
            maxDate={new Date()} // Set maxDate to current date
            minDate={fromDate ? fromDate : undefined}
            onChange={setToDate} // Update toDate state
          />
          <Button onClick={handleToggleClick}>Select</Button>
        </Group>
        {paginatedData.some((item: any) => item.Date === "") &&
          paginatedDataFault.some((item: any) => item.Date === "") && (
            <Card.Section mt="xl">
              <Text ta="center" mt="xl">
                No readings available for the selected date range.
              </Text>
            </Card.Section>
          )}
        {paginatedData.some((item: any) => item.Date !== "") && (
          <Card.Section mt="xl">
            <Title order={3} ta="center" td="underline" mb="xl">
              Normal Reading
            </Title>
            <Grid_resistance_chart
              data={resistanceData}
              color="#2E93fA"
              warning_one={warning_one}
              warning_two={warning_two}
            />
            <Card.Section>
              <Legned />
            </Card.Section>
          </Card.Section>
        )}
        {paginatedDataFault.some((item: any) => item.Date !== "") && (
          <Card.Section mt="xl">
            <Title order={3} ta="center" td="underline" mb="xl">
              Fault Reading
            </Title>
            <Fault_chart data={faultData} color="#E91E63" />
          </Card.Section>
        )}
        {paginatedData.some((item: any) => item.Date !== "") && (
          <Card.Section mt="xl">
            <Title order={3} ta="center" td="underline" mb="xl">
              Normal Reading
            </Title>
            <Flex
              mih={50}
              gap="xl"
              justify="flex-start"
              align="flex-start"
              direction="row-reverse"
              wrap="nowrap"
            >
              <CSVLink data={resistanceData} filename={`${pit_name}_data.csv`}>
                <IconCloudDownload stroke={2} style={{ cursor: "pointer" }} />
              </CSVLink>
            </Flex>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Th>Sr</Table.Th>
                <Table.Th>Date & Time</Table.Th>
                <Table.Th>Resistance (Ω)</Table.Th>
              </Table.Thead>
              <Table.Tbody>
                {paginatedData.map((item: any, index: number) => (
                  <Table.Tr key={index}>
                    <Table.Td>{startIndex + index}</Table.Td>
                    <Table.Td>{item.Date}</Table.Td>
                    <Table.Td>{item.value} </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card.Section>
        )}
        {paginatedData.some((item: any) => item.Date !== "") && (
          <Pagination
            mt="lg"
            value={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(resistanceData.length / itemsPerPage)}
          />
        )}
        {paginatedDataFault.some((item: any) => item.Date !== "") && (
          <Card.Section mt="xl">
            <Title order={3} ta="center" td="underline" mb="xl">
              Fault Reading
            </Title>
            <Flex
              mih={50}
              gap="xl"
              justify="flex-start"
              align="flex-start"
              direction="row-reverse"
              wrap="nowrap"
            >
              <CSVLink data={faultData} filename={`${pit_name}_data.csv`}>
                <IconCloudDownload stroke={2} style={{ cursor: "pointer" }} />
              </CSVLink>
            </Flex>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Th>Sr</Table.Th>
                <Table.Th>Date & Time</Table.Th>
                <Table.Th>Resistance (Ω)</Table.Th>
                <Table.Th>Ground Step (V)</Table.Th>
                <Table.Th>Ground Touch (V)</Table.Th>
                <Table.Th>Lightning Step (V)</Table.Th>
                <Table.Th>Lightning Touch (V)</Table.Th>
              </Table.Thead>
              <Table.Tbody>
                {paginatedDataFault.map((item: any, index: number) => (
                  <Table.Tr key={index}>
                    <Table.Td>{startIndex + index}</Table.Td>
                    <Table.Td>{item.Date}</Table.Td>
                    <Table.Td>{item.value} </Table.Td>
                    <Table.Td>{item.ground_step}</Table.Td>
                    <Table.Td>{item.ground_touch} </Table.Td>
                    <Table.Td>{item.lightning_step}</Table.Td>
                    <Table.Td>{item.lightning_touch} </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card.Section>
        )}
        {paginatedDataFault.some((item: any) => item.Date !== "") && (
          <Pagination
            mt="lg"
            value={currentPageFault}
            onChange={handleFaultPageChange}
            total={Math.ceil(faultData.length / itemsPerPage)}
          />
        )}
      </Card>
    </>
  );
};

export default Scc_details_modal;
