import { useState } from "react";
import { isTaskValid } from "../helpers";
import styles from "./AddTask.module.scss";
import buttonStyles from "./Button.module.scss";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ add }) => {
  const [todoText, setTodoText] = useState("");

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
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
        className={`btn btn-theme-primary ${buttonStyles["c-button"]}`}
        id="push"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
