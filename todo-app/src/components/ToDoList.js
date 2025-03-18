





import { useState } from "react";
import styles from "./ToDoList.module.scss";

const ToDoList = ({ tasks, updateTask, removeTask, toggleTaskCompletion }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleTask = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    updateTask(editingTaskId, { text: editText });
    setEditingTaskId(null);
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
          <li key={task.id} className={styles["c-card"]}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(task.id)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                  autoFocus
                  className={`form-control ${styles["c-card__form"]}`}
                />
              </div>
            ) : (
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className={`c-card ${
                  task.completed ? styles["c-card--done"] : ""
                }`}
              >
                {task.text}
              </span>
            )}
            <div className={styles["c-card__buttons"]}>
              <button
                className={styles["c-card__button"]}
                onClick={() => handleEdit(task)}
              >
                <i
                  className={` ${styles["c-card__icon"]} bi bi-pencil-fill text-primary`}
                ></i>
              </button>
              <button
                className={styles["c-card__button"]}
                onClick={() => removeTask(task.id)}
              >
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
