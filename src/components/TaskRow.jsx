import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TaskRow = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(task.name);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description
  );
  const [updatedStatus, setUpdatedStatus] = useState(task.status);

  const handleSave = () => {
    updateTask({
      ...task,
      name: updatedName,
      description: updatedDescription,
      status: updatedStatus,
    });
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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
      <TableCell>{new Date(task.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        {isEditing ? (
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
