import ToDoList from "../components/ToDoList.js";
import AddTask from "../components/AddTask.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { isTaskValid } from "../helpers";

export default function Dashboard({
  tasks,
  addTask,
  removeTask,
  updateTask,
}) {
  const handleAddTask = (newTaskText) => {
    console.log("handleAddTask received:", newTaskText, typeof newTaskText);

    if (typeof newTaskText === "object" && newTaskText.text) {
      console.warn(
        "⚠️ `newTaskText` is an object, using `newTaskText.text` instead."
      );
      newTaskText = newTaskText.text;
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: newTaskText,
      completed: false,
    };
    console.log("Created new task:", newTask);

    if (!isTaskValid(newTask)) {
      console.log("Task is invalid:", newTask);
      return;
    }

    addTask(newTask);
  };

  const handleUpdateTask = (taskId, newTaskText) => {
    console.log("handleUpdateTask received:", {
      taskId,
      newTaskText,
      type: typeof newTaskText,
    });

    if (typeof newTaskText === "object" && newTaskText.text) {
      console.warn(
        "⚠️ `newTaskText` is an object, using `newTaskText.text` instead."
      );
      newTaskText = newTaskText.text;
    }

    if (!isTaskValid({ text: newTaskText })) return;

    updateTask(taskId, { text: newTaskText });
  };

  const handleRemoveTask = (taskId) => {
    removeTask(taskId);
  };

  const handleToggleTaskCompletion = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) return;

    updateTask(taskId, { ...taskToUpdate, completed: !taskToUpdate.completed });
  };

  return (
    <div>
      <h1>✍️ Task Dashboard</h1>
      <AddTask add={handleAddTask} />
      <ToDoList
        tasks={tasks}
        updateTask={handleUpdateTask}
        removeTask={handleRemoveTask}
        toggleTaskCompletion={handleToggleTaskCompletion}
      />
    </div>
  );
}
