import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "./taskUtils";

const TaskTable = () => {
  const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [filter, setFilter] = useState("");

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success("Task added successfully!");
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success("Task updated successfully!");
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(filter.toLowerCase()) ||
      task.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>Task Management Dashboard</h1>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <ToastContainer />
    </Container>
  );
};

export default TaskTable;
