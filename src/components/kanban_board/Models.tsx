import React, { useState, useEffect, SetStateAction } from "react";
import {
  Button,
  Avatar,
  Badge,
  Grid,
  Card,
  Group,
  Modal,
  Tooltip,
  useComputedColorScheme,
  TextInput,
  Title,
  Select,
  Text,
} from "@mantine/core";

// import AssignmentModal from "./AssignmentModal";
// import Delete_confirmation from "./Delete_confirmation";

import { useDisclosure } from "@mantine/hooks";
import { DndProvider, useDrag, useDrop } from "react-dnd";

import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { DateInput } from "@mantine/dates";

///Kanban dragable items

interface Task {
  id: string;
  title: string;
  description: string;
  assigned: string;
  date: string;
  status: string;
}

const DraggableTask: React.FC<{
  task: Task;
  index: number;

  deleteTask: (id: string) => void;
}> = ({ task, index, deleteTask }) => {
  const [, setDeleteModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // const handleDelete = () => {
  //   setDeleteModalOpen(true);
  // };

  const handleDeleteConfirmation = () => {
    console.log("Task id", task.id);
    if (typeof task.id === "number") {
      deleteTask(task.id);
    }
    setDeleteModalOpen(false);
  };

  const getInitials = (name: string) => {
    if (typeof name === "string" && name.trim() !== "") {
      return name
        .split(" ")
        .map((word) => word.slice(0, 2))
        .join("");
    }

    return ""; // Return an empty string if name is not defined or not a string
  };

  const getRandomColor = (index: number) => {
    const colors = [
      "#F34141",
      "#6BD731",
      "#099CFF",
      "#FFAB09",
      "#8931B2",
      "#F01879",
    ];
    return colors[index % colors.length];
  };
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={drag}
      style={{
        marginBottom: 10,
        padding: 10,
        // border: "1px solid #ccc",
        // backgroundColor:
        //   theme.colorScheme === "dark"
        //     ? theme.colors.gray[6]
        //     : theme.colors.indigo[0],
        borderRadius: 4,
        marginTop: 10,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div key={task.id}>
        <Card
          shadow="xl"
          padding="lg"
          radius="xl"
          withBorder
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.8s ease",
            boxShadow: isHovered ? `0px 0px 5px #147F5B ` : "none",
            // boxShadow: "red",
            // // boxShadow: isHovered
            // //   ? `0px 0px 20px ${
            // //       getRandomColor(index) && `${getRandomColor(index)}4D`
            // //     }`
            // //   : "red",
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{task.title}</strong>
              <p>
                {(() => {
                  const dateObj = new Date(task.date);

                  if (
                    isNaN(dateObj.getTime()) ||
                    !isFinite(dateObj.getTime())
                  ) {
                    return "Invalid Date";
                  }

                  return new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  }).format(dateObj);
                })()}
              </p>
            </div>
            <div>
              <Tooltip label={task.assigned}>
                <Avatar size={30} radius="lg" color={getRandomColor(index)}>
                  <Text tt="uppercase">{getInitials(task.assigned)}</Text>
                </Avatar>
              </Tooltip>
            </div>
          </div>

          {/* Show delete button only in the "Finished" column */}
          {task.status === "finished" && (
            <>
              <Button
                radius="xl"
                style={{ marginTop: 8 }}
                onClick={handleDeleteConfirmation}
              >
                Delete
              </Button>
              {/* <Delete_confirmation
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirmation}
                taskTitle={task.title}
                tasks={task}
              /> */}
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

//Kanban Columns
const DroppableColumn: React.FC<{
  tasks: Task[];
  status: string;
  moveTask: (taskID: string, newStatus: string) => void;
  deleteTask: (id: string) => void;
}> = ({ status, tasks, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; index: number }) => moveTask(item.id, status),
  });

  const tasksInColumn = tasks.filter((task) => task.status === status);

  // console.log("Task sent", tasks);

  return (
    <div
      style={{
        minWidth: 300,
        border: "1.5px solid #ccc",
        borderRadius: 4,
        // backgroundColor: "#f3f0ff",
        padding: 10,
        marginBottom: 20,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Badge
        variant="light"
        color={
          String(status) === "tasks"
            ? "#FF0000"
            : String(status) === "ongoing"
            ? "red"
            : String(status) === "finished"
            ? "green"
            : "#37b24d"
        }
        radius="xl"
        mb="xl"
      >
        {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
      </Badge>

      <div
        ref={drop}
        style={{
          // Set the desired height for the drag-and-drop area
          height: "800px", // Adjust the height as needed
          overflowY: "auto", // Add vertical scrollbar if needed
        }}
      >
        {tasksInColumn.map((task, index) => (
          <DraggableTask
            key={task.id}
            task={task}
            index={index}
            deleteTask={deleteTask} // Pass deleteTask function to DraggableTask
          />
        ))}
      </div>
    </div>
  );
};

//Main Function

interface UserData {
  persona: SetStateAction<string | null>;
  firstname: string;
  lastname: string;
  email: string;
}

const Models = () => {
  const computedColorScheme = useComputedColorScheme();
  console.log(computedColorScheme);

  const [, setData] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const useremail = localStorage.getItem("userEmail");
  const plantName = localStorage.getItem("plantName");
  const domain_version = localStorage.getItem("user");
  const persona_set = localStorage.getItem("persona");
  const name = localStorage.getItem("userFirstname");
  const [personalData, setPersonalData] = useState<UserData[]>([]);
  const [persona, setPersona] = useState<string | null>(persona_set);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task1",
      title: "Task 1",
      description: "Example",
      assigned: "Niju",
      date: "2024-01-26",
      status: "tasks",
    },
    {
      id: "task2",
      title: "Task 2",
      description: "Example2",
      assigned: "Niju",
      date: "2024-01-26",
      status: "ongoing",
    },
    {
      id: "task3",
      title: "Task 3",
      description: "Example3",
      assigned: "Niju",
      date: "2024-01-26",
      status: "finished",
    },
  ]);

  // const [, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newAssigned, setNewAssigned] = useState("");
  const [newDate, setNewDate] = useState<Date | null>(null);
  const [newStatus, setNewStatus] = useState("tasks");

  //Get Values from Kanban Mysql Table

  const fetchData = async () => {
    // console.log("fetch2");
    try {
      console.log("FETCH DATA IN BOARD....");
      const response = await axios.post("/api/show_task", {
        email: useremail,
        plant_name: plantName,
        persona: persona_set,
        name: name,
      });
      // setTasks([...tasks, response.data]);

      console.log("response in tasks", response.data.user_data);
      setTasks(response.data.user_data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
    // axios
    //   .get("http://192.168.10.251:3000/api/list")
    //   .then((response) => {
    //     setTasks(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching tasks: ", error);
    //   });
  };

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, [tasks]);

  console.log("Tasks", tasks);
  //Add task to database
  const addTask = async () => {
    if (
      newTaskTitle.trim() !== "" ||
      newTaskDescription.trim() !== "" ||
      newAssigned !== "" ||
      newStatus !== ""
    ) {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        assigned: newAssigned,
        date: newDate,
        status: "tasks",
        plant_name: plantName,
        domain_version: domain_version,
        persona: persona,
      };

      console.log("add task", newTask);

      try {
        console.log("FETCH DATA IN BOARD....");
        const response = await axios.post("/api/tasks", {
          title: newTaskTitle,
          description: newTaskDescription,
          assigned: newAssigned,
          date: newDate,
          status: "tasks",
          plant_name: plantName,
          domain_version: domain_version,
          persona: persona,
        });
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }

      console.log("Tasks after update", tasks);

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

      try {
        console.log("FETCH DATA IN BOARD....");
        const response = await axios.post("/api/show_task", {
          email: useremail,
          plant_name: plantName,
          persona: persona_set,
        });
        // setTasks([...tasks, response.data]);

        console.log("response in data", response.data.user_data);
        setData(response.data.user_data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    }

    close();
  };

  //Deleting Tasks
  const deleteTask = (taskID: string) => {
    console.log("task ID", taskID);
    axios
      .delete(`/api/delete_task/${taskID}`)
      .then(() => {
        console.log("Task deleted from the database!");
        // Update the local state to remove the deleted task
        const updatedTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
    notifications.show({
      title: "Success !!",
      message: "Task deleted sucessfully",
      color: "teal",
      icon: <CircleCheck size={24} color="white" />,
    });
  };
  // Moving Tasks
  const moveTask = (taskID: string, newStatus: string) => {
    console.log("Move TaskID", newStatus);
    const updatedTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    // Send a PUT or PATCH request to the backend to update the task status in the database
    axios
      .put(`/api/move_task/${taskID}`, {
        status: newStatus,
      })
      .then(() => {
        console.log("Task status updated in the database!");
        // Update the local state to reflect the new status of the task
        const updatedTasks = tasks.map((task) =>
          task.id === taskID ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        setNewStatus(newStatus);
      })
      .catch((error) => {
        console.error("Error updating task status: ", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
  };

  // const handleOpenAssignmentModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseAssignmentModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleDelete = (taskId) => {
  //   // Open the DeleteConfirmationModal and pass tasks as a prop
  //   openDeleteConfirmationModal(taskId, tasks);
  // };

  console.log("tasks data structure", moveTask);

  axios.defaults.baseURL = import.meta.env.VITE_LOGIN_API_URL;

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        console.log("FETCH DATA IN BOARD....");
        const response = await axios.post("/api/maint/users", {
          email: useremail,
          plant_name: plantName,
        });
        setPersonalData(response.data.user_data);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };
    fetchPersonalData();
  }, []);
  console.log("Response data", personalData);

  const handleAssignChange = (value: string | null) => {
    if (value !== null) {
      const selectedPersonalData = personalData.find(
        (data) => data.email === value
      );
      console.log("pp", selectedPersonalData);

      if (selectedPersonalData) {
        setNewAssigned(value);
        setPersona(selectedPersonalData.persona);
      }
    }
  };

  return (
    <div style={{ gap: 20, justifyContent: "center" }}>
      <div style={{ marginTop: 20, marginBottom: 50 }}>
        <Group align="center">
          <Button onClick={open} size="compact-lg">
            +
          </Button>
        </Group>

        <Modal
          opened={opened}
          onClose={close}
          //title="Instructions"
          centered
        >
          <Card shadow="xl" withBorder radius="lg">
            <Title order={4} ta="center" td="underline">
              Assign Task
            </Title>
            <TextInput
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.currentTarget.value)}
              placeholder="Enter a new task title..."
              label="Task Name"
              mt="lg"
              required
              withAsterisk
            />
            <TextInput
              value={newTaskDescription}
              onChange={(event) =>
                setNewTaskDescription(event.currentTarget.value)
              }
              placeholder="Enter a new task description..."
              mt="lg"
              label="Task Description"
              required
              withAsterisk
            />

            <Select
              data={personalData.map((data) => ({
                label: data.firstname,
                value: data.email,
              }))}
              label="Assign"
              required
              withAsterisk
              value={newAssigned} // Set the value of the Select component
              onChange={handleAssignChange} // Handle change to update the selected value
              mt="md"
              searchable
            />

            <DateInput
              value={newDate}
              onChange={setNewDate}
              label="End Date"
              placeholder="End Date"
              mt="lg"
              required
            />

            <Button onClick={addTask} radius="xl" ml="xl" mt="xl">
              Submit
            </Button>
          </Card>
        </Modal>
      </div>
      {/* Kanban design */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 0, lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12, md: 4, lg: 3.33 }}>
          <DndProvider backend={HTML5Backend}>
            <DroppableColumn
              status="tasks"
              tasks={tasks}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          </DndProvider>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4, lg: 3.33 }}>
          <DndProvider backend={HTML5Backend}>
            <div style={{ height: "500px" }}>
              <DroppableColumn
                status="ongoing"
                tasks={tasks}
                moveTask={moveTask}
                deleteTask={deleteTask}
              />
            </div>
          </DndProvider>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 3.33 }}>
          <DndProvider backend={HTML5Backend}>
            <DroppableColumn
              status="finished"
              tasks={tasks}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          </DndProvider>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 0, lg: 1 }}></Grid.Col>
      </Grid>{" "}
    </div>
  );
};

export default Models;
