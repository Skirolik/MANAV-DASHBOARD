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

interface HomeTableProps {
  data: DataRow[];
}

const HomeTable: React.FC<HomeTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const isLargeScreen = useMediaQuery("(min-width:1880px)");

  const rowsPerPage = isLargeScreen ? 8 : 5;
  const [selectedRow, setSelectedRow] = useState<DataRow | null>(null);
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
                value={
                  isValidDate(filterDateTime) ? new Date(filterDateTime) : null
                }
                placeholder="Filter Date & Time"
                onChange={(value) =>
                  setFilterDateTime(value ? value.toISOString() : "")
                }
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
