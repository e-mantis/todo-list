import { useState, useRef } from "react";
import { isTaskValid } from "../helpers";
import styles from "./AddTask.module.scss";

const AddTask = ({ add }) => {
  const [todoText, setTodoText] = useState("");
  const taskIdCounter = useRef(1);

  const handleAddTask = () => {
    const newTask = {
      id: taskIdCounter.current++,
      text: todoText,
      completed: false,
    };

    if (!isTaskValid({ text: todoText })) return;
    add(newTask);
    setTodoText("");
  };

  return (
    <div className={styles["c-add-task"]}>
      <input
        value={todoText}
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()} //task ook toevoegen door 'Enter'
        placeholder="Enter New Task ..."
        className={`form-control ${styles["c-add-task__input"]}`}
        id="addTodo"
      />
      <button
        disabled={!isTaskValid({ text: todoText })}
        className={`btn btn-theme-primary ${styles["c-add-task__button"]}`}
        id="push"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
