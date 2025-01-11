import React from "react";
import { TextField, Grid } from "@mui/material";

const TaskFilter = ({ filter, setFilter }) => (
  <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 3 }}>
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
);

export default TaskFilter;
