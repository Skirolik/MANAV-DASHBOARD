import {
  Modal,
  Card,
  Title,
  Text,
  Input,
  Button,
  Textarea,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const Delete_confirmation = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  tasks,
}) => {
  const [isTitleInInventory, setIsTitleInInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState("");
  const [checks, setChecks] = useState("");

  //   console.log("TT", tasks);

  useEffect(() => {
    const checkTitleInInventory = async () => {
      //   console.log("true saf");
      try {
        const inventoryResponse = await axios.get(
          "http://192.168.10.251:3000/api/inventory"
        );
        const inventoryTitles = inventoryResponse.data.map(
          (item) => item.device_name
        );
        setIsTitleInInventory(inventoryTitles.includes(taskTitle));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching", error);
        setLoading(false);
      }
    };
    checkTitleInInventory();
  }, [taskTitle]);

  //   const originalDate = new Date(taskToUpdate.Date);
  //   const newDate = new Date(originalDate.setDate(originalDate));
  //   const inventoryTask = {
  //     device_name: taskTitle,
  //     next_maintenance_date: newDate.toISOString().split("T")[0],
  //     issues,
  //     checks,
  //   };
  //   console.log("InventTask", inventoryTask);

  const handleConfirm = () => {
    if (!isTitleInInventory) {
      onConfirm();
    } else {
      const taskToUpdate = tasks;
      console.log(taskToUpdate);

      const currentDate = taskToUpdate.date;
      console.log("cd", currentDate);

      const originalDate = new Date(currentDate);
      originalDate.setMonth(originalDate.getMonth() + 8);
      const blue = originalDate.toISOString().split("T")[0];

      console.log("iseasdf", issues);
      console.log("checks", checks);
      console.log("ble", blue);

      const inventoryTask = {
        device_name: taskTitle,
        next_maintenance_date: originalDate.toISOString().split("T")[0],
        Issues: issues,
        Checks: checks,
      };
      console.log("IT", inventoryTask);

      try {
        // Make a PUT request to update the inventory with the new data
        const inventoryUpdate = axios.put(
          `http://192.168.10.251:3000/api/inventory/${taskTitle}`,
          inventoryTask
        );

        // Handle the response from the server as needed
        console.log("Inventory update response:", inventoryUpdate.data);

        // Call onConfirm after the inventory update
        onConfirm();
      } catch (error) {
        // Handle errors during the PUT request
        console.error("Error updating inventory:", error);
      }
      notifications.show({
        title: "Success !!",
        message: "Issue updated sucessfully",
        color: "teal",
        icon: <CircleCheck size={24} color="white" />,
      });

      onConfirm();
      //   const newDate = new Date(originalDate.setDate(originalDate));
      //   console.log("nd", newDate);
    }
    onClose();
  };

  return (
    <div>
      <Modal opened={isOpen} onClose={onClose} title="Confirmation Deletion">
        <Card>
          {loading ? (
            <Title>Checking INventory..</Title>
          ) : isTitleInInventory ? (
            <>
              <Title>Do you want to delete {taskTitle}?</Title>
              <Text mt="lg">This action cannot be undone</Text>

              <Textarea
                mt="xl"
                value={issues}
                description="Max 220 Characters"
                onChange={(event) => setIssues(event.currentTarget.value)}
                placeholder="Enter Issues, if none enter None or N/A"
                required
              />
              <Textarea
                mt="xl"
                value={checks}
                description="Max 220 Characters"
                onChange={(event) => setChecks(event.currentTarget.value)}
                placeholder="Enter checks, if none enter None or N/A"
                required
              />

              <Button
                mt="xl"
                radius="xl"
                ml="xl"
                onClick={handleConfirm}
                disabled={issues.length > 220 || checks.length > 220}
              >
                Confirm
              </Button>
              <Button mt="xl" radius="xl" ml="xl" onClick={onClose}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Title>Task Not in Inventory</Title>
              <Text>Do you still want to delete the task ?</Text>
              <div>
                <Button
                  mt="xl"
                  radius="xl"
                  ml="xl"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  Yes,Delete
                </Button>
                <Button mt="xl" radius="xl" ml="xl" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default Delete_confirmation;
