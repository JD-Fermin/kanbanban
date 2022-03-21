import React, { useState, useEffect } from "react";
import Task from "./task";
import TaskForm from "./task_form";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal } from "@mui/material";
import "./task_index.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { fetchTasks } from "./task_api_utils";
function TaskIndex(props) {
  const { category } = props;
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    fetchTasks(category).then((res) => {
      let newTasks = Object.keys(res).length === 0 ? [] : Object.values(res);
      setTasks(newTasks);
    });
  }, [tasks.length, category]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function handleDragEnd(result) {
    const items = Array.from(tasks);
    
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  return (
    <div className="category">
      <div className="category-header">
        <h2>{category}</h2>
        <span>
          <Button variant="contained" onClick={handleOpen}>
            <AddIcon />
          </Button>
        </span>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="tasks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length === 0
                ? null
                : tasks.map((task, index) => {
                    return <Task task={task} index={index} key={task._id} />;
                  })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <Modal open={open} onClose={handleOpen}>
        <div>
          <TaskForm
            addTask={addTask}
            category={category}
            handleOpen={handleOpen}
          />
        </div>
      </Modal>
    </div>
  );
}

export default TaskIndex;
