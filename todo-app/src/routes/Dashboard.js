import { useState } from "react";
import ToDoList from "../components/ToDoList.js";
import AddTask from "../components/AddTask.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { isTaskValid } from "../helpers";


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    console.log("handleAddTask called with:", newTask); // ✅ Check if function is running

    if (!isTaskValid(newTask)) {
      console.log("Task is invalid"); // ✅ Check if validation is blocking it
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });
  };

  const updateTask = (index, newTaskText) => {
    if (!isTaskValid({ text: newTaskText })) return;

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? { ...task, text: newTaskText } : task
      );

      return updatedTasks;
    });
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((_, i) => i !== index); // Removes the task, (_, i) = bv. (task, i)
    });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  console.log("Current tasks:", tasks);
  return (
    <div>
      <h1>✍️ Task Dashboard</h1>
      <AddTask add={handleAddTask} />
      <ToDoList
        tasks={tasks}
        updateTask={updateTask}
        removeTask={removeTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
}
