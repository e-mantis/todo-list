export const isTaskValid = (task) => {
  if (!task || typeof task.text !== "string") {
    console.error("Task is missing or text is not a string", task);
    return false;
  }
  return true;
};