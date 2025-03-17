import { useState } from "react";
import Header from "./components/Header.js";
import ToDoList from "./components/ToDoList.js";
import AddTask from "./components/AddTask.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { isTaskValid } from "./helpers";
import styles from "./App.module.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const handleAddTask = (taskText) => {
    if (!isTaskValid(taskText)) return;
    setTasks((prevTasks) => [...prevTasks, taskText]);
  };

  const updateTask = (index, newTaskText) => {
    if (!isTaskValid(newTaskText)) return;

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? newTaskText : task
      );

      setCompletedTasks((prev) => {
        const newCompleted = new Set(prev);
        newCompleted.delete(prevTasks[index]);
        return newCompleted;
      });

      return updatedTasks;
    });
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const taskToRemove = prevTasks[index]; // Get the correct task before updating

      setCompletedTasks((prev) => {
        const newCompleted = new Set(prev); //copy of completedTasks bc we should never modify a state directly
        newCompleted.delete(taskToRemove); // Use the correct reference, removes task from the completed list
        return newCompleted;
      });

      return prevTasks.filter((_, i) => i !== index); // Removes the task, (_, i) = bv. (task, i)
    });
  };

  return (
    <>
      <div className={styles["c-container"]}>
        <Header />
        <AddTask add={handleAddTask} />
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
