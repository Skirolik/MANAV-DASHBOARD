import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Pagination,
  Text,
  Card,
  Grid,
  Modal,
  Group,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { CircleCheck, EditOff, Lock } from "tabler-icons-react";

import LazyLoad from "react-lazy-load";
import { notifications } from "@mantine/notifications";
import { AlertCircle } from "tabler-icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";

import {
  Map,
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { getTextColor } from "../utils";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const Device_entries: React.FC<{ back: string }> = ({ back }) => {
  interface DataEntry {
    id: number;
    title: string;
    name: string;
    latitude: string;
    longitude: string;
    resistance: string;
    date_collected: string;
    next_Collection: string;
    description: string;
  }
  // const computedColorScheme = useComputedColorScheme("light");
  const [data, setData] = useState<DataEntry[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [selectedEntry, setSelectedEntry] = useState<Row | null>(null);

  const [selectedMarker, setSelectedMarker] = useState<DataEntry | null>(null);
  const [editedDateCollected, setEditedDateCollected] = useState<string>("");
  const [editedNextCollection, setEditedNextCollection] = useState<string>("");
  const [editedResistance, setEditedResistance] = useState<string>("");
  const [editedRowId, setEditedRowId] = useState<number | null>(null);
  const plantName = localStorage.getItem("plantName");
  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(-1);

  // useEffect(() => {
  //   // Fetch data from the API endpoint
  //   axios
  //     .post("/api/pit_data", plantName)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("api/pit_data", {
        plant_name: plantName,
      });
      console.log("response", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getTotalPages = () => {
    return Math.ceil(data.length / rowsPerPage);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Sort data in descending order based on specific properties of DataEntry objects
    const sortedData = data.slice().sort((a, b) => b.id - a.id);

    return sortedData.slice(startIndex, endIndex);
  };

  const totalPages = getTotalPages();

  // const activePageStyle = {
  //   backgroundImage:
  //     computedColorScheme === "dark"
  //       ? "linear-gradient(45deg, #FFC0CB, violet)"
  //       : "teal",
  //   border: 0,
  // };

  interface Row {
    id: number;
    title: string;
    name: string;
    latitude: string;
    longitude: string;
    resistance: string;
    date_collected: string;
    next_Collection: string;
    description: string;
  }

  const handleRowClick = (row: Row) => {
    if (editedRowId !== row.id) {
      setSelectedEntry(row);
      // Check if next_collection date has passed the current date
      const nextCollectionDate = new Date(row.next_Collection);
      const currentDate = new Date();

      if (nextCollectionDate < currentDate) {
        // Show a notification
        notifications.show({
          title: "Date Passed",
          message: `Next Collection date for ID ${row.id}  has passed.`,
          color: "red",
        });
      }
    }
  };

  useEffect(() => {
    data.forEach((entry) => {
      const nextCollectionDate = new Date(entry.next_Collection);
      const currentDate = new Date();
      if (nextCollectionDate < currentDate) {
        notifications.show({
          title: "Date Passed",
          message: `Next Collection date for ID ${entry.id}  has passed.`,
          color: "red",
        });
      }
    });
  }, [data]);

  const popupStyle = {
    // backgroundColor: "lightgray",
    padding: "12px",
    borderRadius: "4px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
    color: "black",
  };
  const handleEditClick = (row: Row) => {
    // Set the edited dates to the current row's dates
    setEditedDateCollected(row.date_collected);
    setEditedNextCollection(row.next_Collection);
    setEditedResistance(row.resistance);
    // Set the edited row ID
    setEditedRowId(row.id);
  };
  const handleSaveClick = () => {
    const formattedDateCollected = new Date(editedDateCollected)
      .toISOString()
      .split("T")[0];
    const formattedNextCollection = new Date(editedNextCollection)
      .toISOString()
      .split("T")[0];

    // Send the updated date values to the server to update the entry in the database
    axios
      .post("/api/update_entry", {
        id: editedRowId,
        dateCollected: formattedDateCollected,
        nextCollection: formattedNextCollection,
        resistance: editedResistance,
      })
      .then((response) => {
        console.log(response.data.message); // Success message from the backend
        // Find the row in the data array with the editedRowId and update the date values
        const updatedData = data.map((row) => {
          if (row.id === editedRowId) {
            return {
              ...row,
              dateCollected: editedDateCollected,
              nextCollection: editedNextCollection,
            };
          }
          return row;
        });

        // Update the data state with the updatedData
        setData(updatedData);

        // Clear the edited row state variables
        setEditedRowId(null);
        setEditedDateCollected("");
        setEditedNextCollection("");
      })
      .catch((error) => {
        console.error("Error updating entry:", error);
        // Handle error here, show error message to the user, etc.
        notifications.show({
          title: "Entry not updated",
          message: "Error updating entry, please try again",
          color: "red",
        });
      });
  };

  const openDeleteConfirmation = (id: number) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  const handleDeleteClick = (id: number) => {
    console.log("id at delete", id);
    axios
      .delete(`/api/delete_entry/${id}`)
      .then(() => {
        console.log("Task deleted from the database!");
        // Update the local state to remove the deleted task
        const updatedTasks = data.filter((data) => data.id !== id);
        setData(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
        });
      });
    notifications.show({
      title: "Success !!",
      message: "Task deleted sucessfully",
      color: "teal",
    });
    setDeleteConfirmation(false);
  };

  return (
    <div>
      <Title order={2} td="underline" c={getTextColor(back)} ta="center">
        View Pit Data
      </Title>
      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Table
              striped
              highlightOnHover
              withTableBorder
              withColumnBorders
              verticalSpacing="xs"
              horizontalSpacing="xs"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Value</Table.Th>
                  <Table.Th>Collected</Table.Th>
                  <Table.Th>Next Date</Table.Th>
                  <Table.Th>Edit</Table.Th>
                  <Table.Th>Delete</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {getPaginatedData().map((row) => (
                  <Table.Tr key={row.id} onClick={() => handleRowClick(row)}>
                    <Table.Td>
                      {editedRowId === row.id ? (
                        // Render input field for editing resistance value
                        <input
                          type="text"
                          value={editedResistance}
                          onChange={(e) => setEditedResistance(e.target.value)}
                        />
                      ) : (
                        // Render resistance value if not editing
                        row.resistance
                      )}
                    </Table.Td>
                    <Table.Td>
                      {editedRowId === row.id ? (
                        <DateInput
                          value={
                            editedDateCollected
                              ? new Date(editedDateCollected)
                              : null
                          }
                          onChange={(date) =>
                            setEditedDateCollected(
                              date ? date.toISOString().split("T")[0] : ""
                            )
                          }
                        />
                      ) : (
                        formatDate(row.date_collected)
                      )}
                    </Table.Td>
                    <Table.Td>
                      {editedRowId === row.id ? (
                        <DateInput
                          value={
                            editedNextCollection
                              ? new Date(editedNextCollection)
                              : null
                          }
                          onChange={(date) =>
                            setEditedNextCollection(
                              date ? date.toISOString().split("T")[0] : ""
                            )
                          }
                        />
                      ) : (
                        formatDate(row.date_collected)
                      )}
                    </Table.Td>

                    <Table.Td>
                      {editedRowId === row.id ? (
                        <Lock
                          onClick={handleSaveClick}
                          size={18}
                          color="green"
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <EditOff
                          onClick={() => handleEditClick(row)}
                          size={18}
                          color="gray"
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </Table.Td>
                    <Table.Td>
                      <IconTrash
                        onClick={() => openDeleteConfirmation(row.id)}
                        size={23}
                        color="#F34141"
                        style={{ cursor: "pointer" }}
                      />
                    </Table.Td>
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
            {data.length === 0 && <Text>No data available.</Text>}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <LazyLoad>
              <Map
                style={{ width: "100%", height: 450 }}
                initialViewState={{
                  latitude: 23.1957247,
                  longitude: 77.7908816,
                  zoom: 3.5,
                }}
                mapStyle="mapbox://styles/skiro/cluji92k700h401nt0jv6751e"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                {data.map((entry) => (
                  <Marker
                    key={entry.id}
                    longitude={parseFloat(entry.longitude)} // Parse string to number
                    latitude={parseFloat(entry.latitude)} // Parse string to number
                    color="#F34141"
                    onClick={() => setSelectedMarker(entry)}
                  >
                    {/* You can customize the marker by using a custom SVG icon */}
                  </Marker>
                ))}
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />
                {selectedMarker && (
                  <Popup
                    latitude={parseFloat(selectedMarker.latitude)}
                    longitude={parseFloat(selectedMarker.longitude)}
                    style={popupStyle}
                    // closeButton={true}
                    onClose={() => setSelectedMarker(null)} // To close the popup when the close button is clicked
                    closeOnClick={false} // To prevent the map click from closing the popup
                  >
                    <div>
                      <button
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedMarker(null)}
                      >
                        Close
                      </button>
                      <h3>Details of :{selectedMarker.name}</h3>
                      <p>Latitude: {selectedMarker.latitude}</p>
                      <p>Longitude: {selectedMarker.longitude}</p>
                      <p>Resistance: {selectedMarker.resistance}</p>
                      {/* Add more details as needed */}
                    </div>
                  </Popup>
                )}
              </Map>
            </LazyLoad>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 1, lg: 1 }}></Grid.Col>
      </Grid>
      {selectedEntry && (
        <Modal
          opened={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Details of  ${selectedEntry.title}`}
        >
          <div>
            <Text mt="xl">Title: {selectedEntry.title}</Text>
            <Text mt="xl">Name: {selectedEntry.name}</Text>
            <Text mt="xl">Longitude: {selectedEntry.longitude}</Text>
            <Text mt="xl">Latitude: {selectedEntry.latitude}</Text>
            <Text mt="xl">Resistance: {selectedEntry.resistance}</Text>
            <Text mt="xl">
              Date Collected: {formatDate(selectedEntry.date_collected)}
            </Text>
            <Text mt="xl">
              Next Collection: {formatDate(selectedEntry.next_Collection)}
            </Text>
            <Text mt="xl">Description: {selectedEntry.description}</Text>
            {/* Add more fields here as needed */}
          </div>
        </Modal>
      )}
      <Modal opened={deleteConfirmation} onClose={closeDeleteConfirmation}>
        <Text>Are you sure you want to delete this entry?</Text>
        {/* <Button
          ml="xl"
          mt="lg"
          bg="#F34141"
          onClick={() => handleDeleteClick(deleteId)}
        >
          Yes
        </Button> */}
        <Group gap="xl" mt="lg">
          <IconCheck
            onClick={() => handleDeleteClick(deleteId)}
            size={24}
            color="#F34141"
            style={{ cursor: "pointer" }}
          />

          {/* <Button ml="xl" mt="lg" onClick={closeDeleteConfirmation}>
          No
        </Button> */}
          <IconX
            size={24}
            color="#6BD731"
            onClick={closeDeleteConfirmation}
            style={{ cursor: "pointer" }}
          />
        </Group>
      </Modal>
    </div>
  );
};

export default Device_entries;
