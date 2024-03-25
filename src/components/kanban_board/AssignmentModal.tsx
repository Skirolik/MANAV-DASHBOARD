import React, { useEffect, useState } from "react";
import { Modal, Table, Input, Card, Button } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const AssignmentModal = ({ assignmentModalOpenend, onClose }) => {
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const [assignedValues, setAssignedValues] = useState({});

  const handleAssigneeChange = (taskId, assignee) => {
    // Update the assignedValues state
    setAssignedValues((prevValues) => ({
      ...prevValues,
      [taskId]: assignee,
    }));
  };

  const handleAssignTasksSubmit = () => {
    console.log("Hi shahin");

    const assignedTasks = unassignedTasks.map((task) => ({
      title: task.device_name,
      description: task.device_type,
      assigned: assignedValues[task.id],
      date: task.next_maintenance_date,
      status: "tasks",
    }));

    // console.log("task assigned", assignedTasks);
    handleAssigning(assignedTasks);
  };

  const handleAssigning = (assignedTasks) => {
    console.log("tasd", assignedTasks);

    axios
      .post("http://192.168.10.251:3000/api/tasks/bulk-insert", assignedTasks)
      .then((response) => {
        console.log("Tasks added to Kanban");
        notifications.show({
          title: "Success !!",
          message: "Task added sucessfully",
          color: "teal",
          icon: <CircleCheck size={24} color="white" />,
        });
      })
      .catch((error) => {
        console.error("Error adding tasks", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
    onClose();
  };

  useEffect(() => {
    fetchUnassignedTasks();
  }, []);

  const fetchUnassignedTasks = async () => {
    try {
      const inventoryResponse = await axios.get(
        "http://192.168.10.251:3000/api/inventory"
      );
      console.log("ionv", inventoryResponse);
      const inventoryTasks = inventoryResponse.data.filter((task) => {
        const nextMaintenanceDate = new Date(task.next_maintenance_date);
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);

        return (
          nextMaintenanceDate >= new Date() && nextMaintenanceDate <= nextWeek
        );
      });

      const dataResponse = await axios.get(
        "http://192.168.10.251:3000/api/list"
      );
      const exisistingTasksIds = dataResponse.data.map((task) => task.title);

      const unassignedTasks = inventoryTasks
        .map((task) => ({
          ...task,
          next_maintenance_date: new Date(task.next_maintenance_date)
            .toISOString()
            .split("T")[0],
        }))
        .filter((task) => !exisistingTasksIds.includes(task.device_name));
      setUnassignedTasks(unassignedTasks);
      console.log("inventory data", unassignedTasks);
    } catch (error) {
      console.error("Error fetching unassigned tasks: ", error);
    }
  };
  return (
    <Modal
      opened={assignmentModalOpenend}
      onClose={onClose}
      // fullScreen
      size="70%"
      title="Add From Inventory"
    >
      <Card>
        <Table>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Device Type</th>
              <th> Next Maintenance date</th>

              <th>Assignee</th>
            </tr>
          </thead>
          <tbody>
            {unassignedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.device_name}</td>
                <td>{task.device_type}</td>
                <td>
                  {new Date(task.next_maintenance_date).toLocaleDateString()}
                </td>
                <td>
                  <Input
                    value={assignedValues[task.id] || ""}
                    onChange={(e) =>
                      handleAssigneeChange(task.id, e.target.value)
                    }
                  ></Input>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={handleAssignTasksSubmit} radius="xl" mt="xl">
          Assign Tasks
        </Button>
      </Card>
    </Modal>
  );
};

export default AssignmentModal;
