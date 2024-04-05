import { Card, Grid, Pagination, Table } from "@mantine/core";
import React, { useState } from "react";

export interface GripTable {
  Date: string;
  value: number;
}

const Grid_resistance_table: React.FC<{ data: GripTable[] }> = ({ data }) => {
  console.log("Date", data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, data.length);
  const paginatedData = data.slice(startIndex - 1, endIndex);
  return (
    <>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, lg: 10 }}>
          <Card withBorder radius="lg" shadow="xl">
            <Table
              striped
              highlightOnHover
              withTableBorder
              withColumnBorders
              withRowBorders
              mt="xl"
            >
              <Table.Thead>
                <Table.Th>Date</Table.Th>
                <Table.Th>Resistance</Table.Th>
              </Table.Thead>
              <Table.Tbody>
                {paginatedData.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{item.Date}</Table.Td>
                    <Table.Td>{item.value}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <Pagination
              mt="md"
              value={currentPage}
              onChange={handlePageChange}
              total={Math.ceil(data.length / itemsPerPage)}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
    </>
  );
};

export default Grid_resistance_table;
