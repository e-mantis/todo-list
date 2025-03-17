export const isTaskValid = (task) => {
  if (task.trim() === "") return false;
  return true;
};
