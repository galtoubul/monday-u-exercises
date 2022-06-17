const createTask = (taskId, taskText, isTaskChecked, doneTime, callbacks) => {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const { text, textContainer } = createTaskText(taskText, isTaskChecked);
  taskContainer.appendChild(
    createCheckbox(
      taskId,
      isTaskChecked,
      callbacks.checkUncheckTask,
      text,
      textContainer
    )
  );
  textContainer.appendChild(text);
  if (doneTime) {
    textContainer.appendChild(createDoneTimeStamp(doneTime));
  }
  taskContainer.appendChild(textContainer);
  taskContainer.appendChild(
    createDeleteButton(taskContainer, taskId, callbacks.deleteTask)
  );

  return taskContainer;
};

const createCheckbox = (
  taskId,
  isTaskChecked,
  checkUncheckTask,
  text,
  textContainer
) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("task-checkbox");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", taskId);
  input.checked = isTaskChecked;
  input.addEventListener("click", (_) => {
    const newCheckedStatus = input.checked;
    checkUncheckTask(textContainer, text, taskId, newCheckedStatus);
  });

  const label = document.createElement("label");
  label.setAttribute("for", taskId);

  checkboxContainer.appendChild(input);
  checkboxContainer.appendChild(label);
  return checkboxContainer;
};

const createTaskText = (taskText, isTaskChecked) => {
  const textContainer = document.createElement("div");
  textContainer.classList.add("task-txt-container");

  const text = document.createElement("p");
  text.classList.add("task-txt");
  if (isTaskChecked) {
    text.classList.add("done-task-txt");
  }
  text.innerHTML = taskText;

  textContainer.appendChild(text);
  return { text, textContainer };
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

const createDoneTimeStamp = (doneTime) => {
  const doneTimeContainer = document.createElement("div");
  doneTimeContainer.classList.add(doneTimeClass);
  const doneTimetext = document.createElement("p");
  doneTimetext.innerText = `Completed at: ${doneTime}`;
  doneTimeContainer.appendChild(doneTimetext);
  return doneTimeContainer;
};
