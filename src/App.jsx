import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const TaskTable = () => {
  const [tasks, setTasks] = useState(getTasksFromLocalStorage());
  const [isEditing, setIsEditing] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("Pending");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Pending");
  const [filter, setFilter] = useState("");

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      name: newTaskName,
      description: newTaskDescription,
      status: newTaskStatus,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success("Task added successfully!");
    setNewTaskName(""); // Clear input field
    setNewTaskDescription(""); // Clear description field
    setNewTaskStatus("Pending"); // Reset status
  };

  const handleEdit = (task) => {
    setIsEditing(task.id);
    setUpdatedName(task.name);
    setUpdatedDescription(task.description);
    setUpdatedStatus(task.status); // Set status for edit
  };

  const handleSave = (taskId) => {
    const updatedTask = {
      id: taskId,
      name: updatedName,
      description: updatedDescription,
      status: updatedStatus,
      createdAt: tasks.find((task) => task.id === taskId).createdAt, // Preserve original timestamp
    };
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setIsEditing(null);
    setUpdatedName("");
    setUpdatedDescription("");
    setUpdatedStatus("Pending");
    toast.success("Task updated successfully!");
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Filter tasks based on task name or status
  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(filter.toLowerCase()) ||
      task.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>Task Management Dashboard</h1>
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 3 }}>
        {/* Filter Section */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search Tasks"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            variant="outlined"
            placeholder="Search by Name or Status"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {/* Add Task Form */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ marginTop: 2 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    {isEditing === task.id ? (
                      <TextField
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    ) : (
                      task.name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === task.id ? (
                      <TextField
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                      />
                    ) : (
                      task.description
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === task.id ? (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={updatedStatus}
                          onChange={(e) => setUpdatedStatus(e.target.value)}
                          label="Status"
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      task.status
                    )}
                  </TableCell>
                  <TableCell>{formatDate(task.createdAt)}</TableCell>
                  <TableCell>
                    {isEditing === task.id ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleSave(task.id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
      <ToastContainer /> {/* Ensure this is included */}
    </Container>
  );
};

export default TaskTable;
