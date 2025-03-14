import { useState } from "react";
import "./App.css";
import Header from "./Header.js";
import ToDoList from "./ToDoList.js";
import AddTask from "./AddTask.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const addTask = (taskText) => {
    if (taskText.trim() === "");
    setTasks((prevTasks) => [...prevTasks, taskText]);
  };

  const updateTask = (index, newTaskText) => {
    if (newTaskText.trim() === "") return;

    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? newTaskText : task))
    );

    setCompletedTasks((prev) => {
      const newCompleted = new Set(prev);
      newCompleted.delete(tasks[index]);
      return newCompleted;
    });
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index)); // (_, i) = bv. (task, i)
    setCompletedTasks((prev) => {
      const newCompleted = new Set(prev); //copy of completedTasks bc we should never modify a state directly
      newCompleted.delete(tasks[index]); //removes task from the completed list
      return newCompleted;
    });
  };

  return (
    <>
      <div className="c-container">
        <Header />
        <AddTask add={addTask} />
        <ToDoList
          tasks={tasks}
          updateTask={updateTask}
          removeTask={removeTask}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </>
  );
}
export default App;
