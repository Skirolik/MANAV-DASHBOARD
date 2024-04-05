import { Button, Modal, Pagination, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";

import Scc_details_modal from "./Scc_details_modal";

interface RfemDetailsTable {
  Pit_name: string;
  latest_reading: number;
  latest_date: string;
  mac_id: string;
}

const Detials_table: React.FC<{ data: RfemDetailsTable[] }> = ({ data }) => {
  const [selectedMacId, setSelectedMacId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const itemsPerPage = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDetailsClick = (macId: string) => {
    setSelectedMacId(macId);
    open();
  };
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, data.length);

  const paginatedData = data.slice(startIndex - 1, endIndex);
  return (
    <>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Pit Name</Table.Th>
            <Table.Th>Latest Resistance</Table.Th>
            <Table.Th>Latest Date</Table.Th>
            <Table.Th>Details</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedData.map((item, index) => (
            <Table.Tr key={index}>
              <Table.Td>{item.Pit_name}</Table.Td>
              <Table.Td>{item.latest_reading}</Table.Td>
              <Table.Td>{item.latest_date}</Table.Td>
              <Table.Td>
                <Button onClick={() => handleDetailsClick(item.mac_id)}>
                  Details
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Pagination
        mt="lg"
        value={currentPage}
        onChange={handlePageChange}
        total={Math.ceil(data.length / itemsPerPage)}
      />
      <Modal
        opened={opened}
        onClose={close}
        size="calc(100vw - 3rem)"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Scc_details_modal macid={selectedMacId} />
      </Modal>
    </>
  );
};

export default Detials_table;
