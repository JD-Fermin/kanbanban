import React, { useState } from "react";
import { Paper, Modal, Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteTask } from "./task_api_utils";
import TaskForm from "./task_form";

function Task(props) {
  const { task, index, removeTask, addTask, formType } = props;
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(!open);
  }
  const deadline = format(new Date(task.deadline), "MM/dd/yyyy 'at' h:mm a");

  function handleDelete(task) {
    deleteTask(task._id).then((res) => removeTask(res));
  }
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper
            variant="contained"
            elevation={4}
            sx={{ bgcolor: "#fee4c3", padding: "10px", margin: "10px" }}
            className="task"

          >
            <Typography variant="h5">{task.name}</Typography>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="h6">{task.description}</Typography>
              <Typography variant="p">{deadline}</Typography>
            </Box>
           
         
              <DeleteIcon
                onClick={() => handleDelete(task)}
                sx={{ cursor: "pointer" }}
              />
              <EditIcon onClick={handleOpen} sx={{ cursor: "pointer" }}/>
           
          </Paper>
          <Modal open={open} onClose={handleOpen} >
           <div>

              <TaskForm
                addTask={addTask}
                formType={formType}
                handleOpen={handleOpen}
                category={task.status}
                editTask={task}
              />
           </div>
            
          </Modal>
        </Box>
      )}
    </Draggable>
  );
}

export default Task;
