import ToDoList from "../components/ToDoList";
import { useTasks } from "../context/TasksContext";

const Tasks = () => {
  const { tasks, updateTask, removeTask, toggleTaskCompletion } = useTasks();

  return (
    <div>
      <h1>📋 Alle Taken</h1>
      <ToDoList
        tasks={tasks}
        updateTask={updateTask}
        removeTask={removeTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
};

export default Tasks;