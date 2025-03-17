import { useState } from "react";
import styles from "./ToDoList.module.scss";

const ToDoList = ({ tasks, updateTask, removeTask, toggleTaskCompletion }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleTask = (task) => {
    toggleTaskCompletion(task.id);
  };

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setEditText(task.text); // bestaande tekst laten staan bij editen
  };

  const saveEdit = (index) => {
    updateTask(index, editText);
    setEditingIndex(null);
  };

  return (
    <>
      {tasks.length > 0 && (
        <p>
          <i className={`${styles["c-list__icon--check"]} bi bi-check`}></i>{" "}
          {tasks.filter((task) => task.completed).length} / {tasks.length} tasks
          completed
        </p>
      )}

      <ul className={styles["c-list"]}>
        {tasks.map((task, index) => (
          <li key={index} className={styles["c-card"]}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(index)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                  autoFocus
                  className={`form-control ${styles["c-card__form"]}`}
                />{" "}
              </div>
            ) : (
              <span
                onClick={() => toggleTask(task)}
                className={`c-card ${
                  task.completed ? styles["c-card--done"] : ""
                }`}
              >
                {task.text}
              </span>
            )}
            <div className={styles["c-card__buttons"]}>
              <button className={styles["c-card__button"]} onClick={() => handleEdit(index, task)}>
                <i
                  className={` ${styles["c-card__icon"]} bi bi-pencil-fill text-primary`}
                 
                ></i>
              </button>
              <button className={styles["c-card__button"]} onClick={() => removeTask(index)}>
                <i
                  className={`${styles["c-card__icon"]} bi bi-trash-fill text-danger`}
                 
                ></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
