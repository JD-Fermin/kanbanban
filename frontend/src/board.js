import React, { useState, useEffect } from "react";
import TaskIndex from "./task_index";
import "./board.css";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchTasks, updateTask } from "./task_api_utils";
import { fetchColumns } from "./column_api_utils";

function Board(props) {
  const [tasks, setTasks] = useState({});
  const [columns, setColumns] = useState({});


  useEffect(() => {
    fetchTasks().then((res) => {
      let newTasks = Object.keys(res).length === 0 ? {} : res;
      setTasks(newTasks);
    });
  }, [tasks.length]);

  useEffect(() => {
    fetchColumns().then((res) => {
      let newColumns = Object.keys(res).length === 0 ? {} : res;
      setColumns(newColumns);
    });
  }, []);

  const filteredTasks = {
    Todo: columns["Todo"] ? columns["Todo"].order : [],
    "In Progress": columns["In Progress"] ? columns["In Progress"].order : [],
    Completed: columns["Completed"] ? columns["Completed"].order : [],
  };
  

  function handleDragEnd(result) {
    const item = filteredTasks[result.source.droppableId][result.source.index];
    if (result.source.droppableId === result.destination.droppableId) {
      const [reorderedItem] = filteredTasks[result.source.droppableId].splice(
        result.source.index,
        1
      );
      filteredTasks[result.source.droppableId].splice(
        result.destination.index,
        0,
        reorderedItem
      );
      return;
    }

    item.status = result.destination.droppableId;
    updateTask(item).then((res) => {
      addTask(res);
    });
  }

  function addTask(task) {
    setTasks({ ...tasks, [task._id]: task });
  }

  function removeTask(task) {
    const newTasks = Object.assign({}, tasks);
    delete newTasks[task._id];
    setTasks(newTasks);
  }

  console.log(filteredTasks);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div id="board">
        <TaskIndex
          tasks={filteredTasks["Todo"]}
          addTask={addTask}
          category={"Todo"}
          removeTask={removeTask}
        />
        <TaskIndex
          tasks={filteredTasks["In Progress"]}
          addTask={addTask}
          category={"In Progress"}
          removeTask={removeTask}
        />
        <TaskIndex
          tasks={filteredTasks["Completed"]}
          addTask={addTask}
          removeTask={removeTask}
          category={"Completed"}
        />
      </div>
    </DragDropContext>
  );
}

export default Board;
