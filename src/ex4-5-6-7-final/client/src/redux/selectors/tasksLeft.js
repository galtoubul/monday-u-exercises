export const selectTasksLeftNum = (state) =>
  state.tasks.filter((task) => !task.checked).length;
