import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Modal,
  Pagination,
  Paper,
  Select,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { IconRefresh } from "@tabler/icons-react";

interface DataRow {
  0: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: number;
  6: number;
  7: number;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
  19: string;
  20: string;
  21: string;
  22: string;
  23: string;
  24: string;
  25: string;
}

interface UniqueRow {
  id: number;
  name: string;
}

interface HomeTableProps {
  data: DataRow[];
  uniqueValues: UniqueRow[];
}

const HomeTable: React.FC<HomeTableProps> = ({ data, uniqueValues }) => {
  console.log("Data in table", uniqueValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const isLargeScreen = useMediaQuery("(min-width:1280px)");

  const rowsPerPage = isLargeScreen ? 8 : 5;
  const [selectedRow, setSelectedRow] = useState<DataRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDateTime, setFilterDateTime] = useState("");
  const [filterAlert, setFilterAlert] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    if (filterDateTime !== "" || filterAlert !== "" || filterName !== "") {
      applyFilters();
    } else {
      setFilteredData(data);
    }
  }, [filterDateTime, filterAlert, filterName, data]);

  const applyFilters = () => {
    let filtered = data;
    console.log("Filterd Data", filterName);

    if (filterDateTime !== "") {
      filtered = filtered.filter((row) => {
        const formattedRowDate = new Date(row[25]).toLocaleDateString();
        const formattedFilterDate = new Date(
          filterDateTime
        ).toLocaleDateString();
        return formattedRowDate === formattedFilterDate;
      });
    }

    if (filterAlert !== "") {
      filtered = filtered.filter((row) => row[8] === filterAlert);
    }

    if (filterName !== "") {
      filtered = filtered.filter((row) => row[1] === filterName);
    }

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setFilterDateTime("");
    setFilterAlert("");
    setFilterName("");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredData.length / rowsPerPage);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const sortedData = filteredData.slice().sort((a, b) => b[0] - a[0]);

    return sortedData.slice(startIndex, endIndex);
  };

  const totalPages = getTotalPages();

  const handleRowClick = (row: DataRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  return (
    <>
      <Text ta="center" fz="xl" fw={800} mb="xs">
        Data Table
      </Text>
      <Divider size="md" />
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <Select
            data={[
              { label: "Name", value: "" },
              ...uniqueValues.map((item) => ({
                label: item.name,
                value: item.name,
              })),
            ]}
            placeholder="Filter Name"
            value={filterName}
            onChange={(value) => setFilterName(value || "")}
            style={{ marginRight: "10px" }}
          />
          <Select
            data={[
              { label: "Status", value: "" },
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            placeholder="Filter Alert"
            value={filterAlert}
            onChange={(value) => setFilterAlert(value || "")}
            style={{ marginRight: "10px" }}
          />
          <DateInput
            value={
              isValidDate(filterDateTime) ? new Date(filterDateTime) : null
            }
            placeholder="Filter Date & Time"
            onChange={(value) =>
              setFilterDateTime(value ? value.toISOString() : "")
            }
            style={{ marginRight: "10px" }} // Add margin-right to separate from the next element
          />
          <Tooltip
            arrowOffset={10}
            arrowSize={4}
            label="Reset"
            withArrow
            position="top-start"
          >
            <Button variant="outline" size="compact-xs" onClick={resetFilters}>
              <IconRefresh stroke={2} />
            </Button>
          </Tooltip>
        </div>

        <Table mt="xs" striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Warning</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {getPaginatedData().map((row) => (
              <Table.Tr
                key={row[0]}
                onClick={() => handleRowClick(row)}
                style={{ cursor: "pointer" }}
              >
                <Table.Td style={{ width: "250px" }}>{row[1]}</Table.Td>
                <Table.Td style={{ width: "250px", textAlign: "center" }}>
                  {row[8] === "1" ? "Yes" : "No"}
                </Table.Td>
                <Table.Td style={{ width: "250px", textAlign: "center" }}>
                  {row[25]}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </>
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          size="sm"
          siblings={2}
          boundaries={1}
          style={{ marginTop: "20px" }}
        />
      )}
      {selectedRow && (
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="auto"
          transitionProps={{
            transition: "fade",
            duration: 500,
            timingFunction: "linear",
          }}
        >
          <Paper shadow="md" radius="lg" p="xl">
            <Text mt="xl" hidden>
              ID: {selectedRow[0]}
            </Text>
            <Text mt="xl">Name: {selectedRow[1]}</Text>
            <Text mt="xl">Date and Time: {selectedRow[22]}</Text>
            <Text mt="xl">Electro Static: {selectedRow[5]}</Text>
            <Text mt="xl">Spark: {selectedRow[6]}</Text>
            <Text mt="xl">Environment: {selectedRow[7]}</Text>
            <Text mt="xl">
              Warning: {selectedRow[8] === "1" ? "Yes" : "No"}
            </Text>
          </Paper>
        </Modal>
      )}
      {data.length === 0 && (
        <Card
          withBorder
          radius="lg"
          mb="xl"
          mt="xl"
          style={{ height: "100%", overflow: "hidden" }}
        >
          <Text ta="center" mt="xl" mb="xl">
            No data available.
          </Text>
        </Card>
      )}
    </>
  );
};

export default HomeTable;
