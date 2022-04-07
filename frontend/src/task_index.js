import React, { useState } from "react";
import Task from "./task";
import TaskForm from "./task_form";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Card, Modal, Typography } from "@mui/material";

import { Droppable } from "react-beautiful-dnd";

function TaskIndex(props) {
  const { tasks, addTask, removeTask, category } = props;

  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(!open);
  }
  
  return (
    <React.Fragment>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} className="category-header">
        <Typography variant="h4">{category}</Typography>
    
          <Button variant="contained" onClick={handleOpen}>
            <AddIcon />
          </Button>
    
      </Box>
      <Card sx={{height: "85vh", padding: "10px"}} >
        <Droppable droppableId={category}>
          {(provided) => (
            <Box
              className="tasks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length === 0
                ? null
                : tasks.map((task, index) => {
                    return (
                      <Task
                        task={task}
                        index={index}
                        key={task._id}
                        removeTask={removeTask}
                        addTask={addTask}
                        formType={"Edit"}
                      />
                    );
                  })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Card>

      <Modal open={open} onClose={handleOpen}>
        <div>
        <TaskForm
            addTask={addTask}
            formType={"Create"}
            category={category}
            handleOpen={handleOpen}
          />
        </div>
          
       
      </Modal>
    </React.Fragment>
  );
}

export default TaskIndex;
