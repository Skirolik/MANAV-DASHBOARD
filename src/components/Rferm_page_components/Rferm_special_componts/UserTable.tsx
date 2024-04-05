import { Card, Grid, Pagination, Table } from "@mantine/core";
import React, { useState } from "react";

export interface UserTableProp {
  name: string;
  email: string;
  status: string;
}

const UserTable: React.FC<{ data: UserTableProp[] }> = ({ data }) => {
  console.log(data);

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
          <Card p="xl" withBorder radius="lg" shadow="xl">
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Thead>
              <Table.Tbody>
                {paginatedData.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{item.name}</Table.Td>
                    <Table.Td>{item.email}</Table.Td>
                    <Table.Td>{item.status}</Table.Td>
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

export default UserTable;
