import React, { useEffect, useState } from "react";
import Task from "./task";
import TaskForm from "./task_form";
function Board(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks([
      {
        id: 0,
        name: "Subscribe",
        description: "TO ME",
        deadline: new Date(),
        status: "todo",
      },

      {
        id: 1,
        name: "Play SMC",
        description: "git gud",
        deadline: new Date(),
        status: "in progress",
      },

      {
        id: 2,
        name: "play blue archive",
        description: "get the summons",
        deadline: new Date(),
        status: "done",
      },
      
    ]);
  }, []);
  function addTask(newTask) {
      setTasks([...tasks, newTask]);
  }
  return (
    <div id="board">
        {
            tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))
        }
        <TaskForm addTask={addTask}/>
    </div>
  );
}

export default Board;
