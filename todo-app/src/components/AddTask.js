import { useState } from "react";
import { isTaskValid } from "../helpers";
import styles from "./AddTask.module.scss";

const AddTask = ({ add }) => {
  const [todoText, setTodoText] = useState("");

  const handleAddTask = () => {
    if (!isTaskValid(todoText)) return;
    add(todoText);
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
        disabled={!isTaskValid(todoText)}
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
