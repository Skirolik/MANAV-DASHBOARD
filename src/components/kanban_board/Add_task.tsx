import React, { useState } from "react";
import { Modal, Card, Input, Button, useMantineTheme } from "@mantine/core";
import axios from "axios";

import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const Add_task = ({ handleOpen, onClose }) => {
  const theme = useMantineTheme();

  const [tasks, setTasks] = useState([
    { id: "task1", title: "Task 1", description: "Example", status: "tasks" },
    {
      id: "task2",
      title: "Task 2",
      description: "Example2",
      status: "ongoing",
    },
    {
      id: "task3",
      title: "Task 3",
      description: "Example3",
      status: "finished",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newAssigned, setNewAssigned] = useState("");
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newStatus, setNewStatus] = useState("tasks");
  const [data, setData] = useState([]);

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        assigned: newAssigned,
        date: newDate,
        status: newStatus,
      };

      console.log("add task", newTask);

      axios
        .post("http://192.168.10.251:3000/api/tasks", newTask)
        .then((response) => {
          console.log("Task added to the database!");
          // Now update the local state with the new task
          setTasks([...tasks, response.data]);
        })
        .catch((error) => {
          console.error("Error adding task: ", error);
          notifications.show({
            title: "Request Failed",
            message:
              "An Error has occured , try again if not please contact us by clicking on contact us page",
            color: "red",
            icon: <AlertCircle size={24} color="black" />,
          });
        });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewAssigned("");
      setNewDate(null);
      notifications.show({
        title: "Success !!",
        message: "Task added sucessfully",
        color: "teal",
        icon: <CircleCheck size={24} color="white" />,
      });

      axios
        .get("http://192.168.10.251:3000/api/data")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          notifications.show({
            title: "Request Failed",
            message:
              "An Error has occured , try again if not please contact us by clicking on contact us page",
            color: "red",
            icon: <AlertCircle size={24} color="black" />,
          });
        });
    }
  };
  return (
    <div>
      <Modal
        opened={handleOpen}
        onClose={close}
        //title="Instructions"
        centered
      >
        <Card>
          <Input
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.currentTarget.value)}
            placeholder="Enter a new task title..."
            style={{ marginBottom: 10 }}
          />
          <Input
            value={newTaskDescription}
            onChange={(event) =>
              setNewTaskDescription(event.currentTarget.value)
            }
            placeholder="Enter a new task description..."
            style={{ marginBottom: 10 }}
          />
          <Input
            value={newAssigned}
            onChange={(event) => setNewAssigned(event.currentTarget.value)}
            placeholder="Task Assigned to"
            style={{ marginBottom: 10 }}
          />
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
            style={{
              marginBottom: 10,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor:
                theme.colorScheme === "dark" ? "#25262b" : "#fff",
              color: theme.colorScheme === "dark" ? "#495057" : "#A6A7AB", // Set text color based on theme
            }}
          />

          <Button
            onClick={addTask}
            radius="xl"
            ml="xl"
            mt="xl"
            variant="gradient"
          >
            Submit
          </Button>
        </Card>
      </Modal>
    </div>
  );
};

export default Add_task;
