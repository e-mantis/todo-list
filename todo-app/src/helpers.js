export const isTaskValid = (task) => {
  if (!task || typeof task.text !== "string") {
    console.log("Task is missing or text is not a string"); // ✅ Debugging
    return false;
  }

  const trimmedText = task.text.trim();

  return trimmedText.length > 0; // ✅ Ensures task has at least one character
};
