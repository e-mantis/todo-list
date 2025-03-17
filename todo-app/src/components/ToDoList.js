import { useState } from "react";
import styles from "./ToDoList.module.scss";

const ToDoList = ({
  tasks,
  updateTask,
  removeTask,
  completedTasks,
  setCompletedTasks,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleTask = (task) => {
    setCompletedTasks((prev) => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(task)) {
        newCompleted.delete(task);
      } else {
        newCompleted.add(task);
      }
      return newCompleted;
    });
  };

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setEditText(task); // bestaande tekst laten staan bij editen
  };

  const saveEdit = (index) => {
    updateTask(index, editText);
    setEditingIndex(null);
  };

  return (
    <>
      {tasks.length > 0 && (
        <p>
          ✅ {completedTasks.size} / {tasks.length} tasks completed
        </p>
      )}

      <ul className={styles["c-list"]}>
        {tasks.map((task, index) => (
          <li key={index} className={styles["c-list__item"]}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(index)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                autoFocus
                className={`form-control ${styles["c-list__item--form"]}`}
              />
            ) : (
              <span
                onClick={() => toggleTask(task)}
                className={`c-list__item ${
                  completedTasks.has(task) ? styles["c-list__item--done"] : ""
                }`}
              >
                {task}
              </span>
            )}

            <i
              className={` ${styles["c-list__icon"]} bi bi-pencil-fill text-primary`}
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(index, task)}
            ></i>

            <i
              className={`${styles["c-list__icon"]} bi bi-trash-fill text-danger`}
              style={{ cursor: "pointer" }}
              onClick={() => removeTask(index)}
            ></i>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
