const createTask = (taskId, taskText, isTaskChecked, callbacks) => {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  taskContainer.appendChild(createCheckbox(taskId, isTaskChecked));
  taskContainer.appendChild(createTaskText(taskText));
  taskContainer.appendChild(
    createDeleteButton(taskContainer, taskId, callbacks.deleteTask)
  );

  return taskContainer;
};

const createCheckbox = (taskId, isTaskChecked) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("task-checkbox");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", taskId);
  input.checked = isTaskChecked;

  const label = document.createElement("label");
  label.setAttribute("for", taskId);

  checkboxContainer.appendChild(input);
  checkboxContainer.appendChild(label);
  return checkboxContainer;
};

const createTaskText = (taskText) => {
  const textContainer = document.createElement("div");
  textContainer.classList.add("task-txt-container");

  const text = document.createElement("p");
  text.classList.add("task-txt");
  text.innerHTML = taskText;

  textContainer.appendChild(text);
  return textContainer;
};

const createDeleteButton = (taskContainer, taskId, deleteTask) => {
  const button = document.createElement("button");
  button.classList.add("trash");

  const image = document.createElement("img");
  image.setAttribute("src", "./images/delete_icon.svg");

  button.appendChild(image);
  button.addEventListener("click", (_) => deleteTask(taskContainer, taskId));
  return button;
};
