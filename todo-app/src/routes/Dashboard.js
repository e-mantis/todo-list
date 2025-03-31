import ToDoList from "../components/ToDoList.js";
import AddTask from "../components/AddTask.js";
import { useTasks } from "../context/TasksContext";

const API_URL = "http://localhost:5002/tasks";

export default function Dashboard() {
  const { tasks, addTask, removeTask, updateTask, toggleTaskCompletion } =
    useTasks();
  return (
    <div>
      <h1>✍️ Task Dashboard</h1>
      <AddTask add={addTask} />
      <ToDoList
        tasks={tasks}
        updateTask={updateTask}
        removeTask={removeTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
}
