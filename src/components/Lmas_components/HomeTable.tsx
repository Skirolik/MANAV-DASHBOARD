import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Modal,
  Pagination,
  Paper,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

const HomeTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const isLargeScreen = useMediaQuery("(min-width:1880px)");
  console.log("screen", isLargeScreen);
  const rowsPerPage = isLargeScreen ? 8 : 5;
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDateTime, setFilterDateTime] = useState("");
  const [filterAlert, setFilterAlert] = useState("");

  useEffect(() => {
    if (filterDateTime !== "" || filterAlert !== "") {
      applyFilters();
    } else {
      setFilteredData(data);
    }
  }, [filterDateTime, filterAlert, data]);

  const applyFilters = () => {
    let filtered = data;

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

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setFilterDateTime("");
    setFilterAlert("");
  };

  const handlePageChange = (newPage) => {
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

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  return (
    <>
      <Text ta="center" fz="xl" fw={800}>
        Data Table
      </Text>
      <Divider size="lg" />

      <Table mt="xl" striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>
              <TextInput
                value={filterAlert}
                placeholder="Filter Alert (0 or 1)"
                onChange={(event) => setFilterAlert(event.target.value)}
              />
              Alert
            </Table.Th>
            <Table.Th>
              <DateInput
                value={filterDateTime}
                placeholder="Filter Date & Time"
                onChange={(value) => setFilterDateTime(value)}
              />{" "}
              Date
            </Table.Th>
            <Table.Th>
              <Button
                variant="outline"
                size="xs"
                style={{ padding: "5px 10px" }}
                onClick={resetFilters}
              >
                Reset
              </Button>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {getPaginatedData().map((row) => (
            <Table.Tr
              key={row[0]}
              onClick={() => handleRowClick(row)}
              style={{ cursor: "pointer" }}
            >
              <Table.Td>{row[1]}</Table.Td>
              <Table.Td>{row[8]}</Table.Td>
              <Table.Td>{row[25]}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          size="sm"
          siblings={2}
          limit={1}
          boundaries={1}
          position="right"
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
            <Text mt="xl">ID: {selectedRow[0]}</Text>
            <Text mt="xl">Name: {selectedRow[1]}</Text>
            <Text mt="xl">Date and Time: {selectedRow[4]}</Text>
            <Text mt="xl">Electro Static: {selectedRow[5]}</Text>
            <Text mt="xl">Spark: {selectedRow[6]}</Text>
            <Text mt="xl">Environment: {selectedRow[7]}</Text>
            <Text mt="xl">Alert: {selectedRow[8]}</Text>
          </Paper>
        </Modal>
      )}

      {data.length === 0 && <Text>No data available.</Text>}
    </>
  );
};

export default HomeTable;
