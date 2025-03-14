import { useState } from "react";

const AddTask = ({ add }) => {
  const [todoText, setTodoText] = useState("");

  const handleAddTask = () => {
    if (todoText.trim() === "") return; //prevent lege tasks
    add(todoText.trim());
    setTodoText(""); //clear input after add
  };

  return (
    <div className="c-add-task">
      <input
        value={todoText}
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()} //task ook toevoegen door 'Enter'
        placeholder="Enter New Task ..."
        className="form-control c-add-task__input"
        id="addTodo"
      />
      <button
        disabled={todoText.length === 0}
        className="btn btn-theme-primary c-add-task__button"
        id="push"
        onClick={() => {
          add(todoText.trim());
          setTodoText("");
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
