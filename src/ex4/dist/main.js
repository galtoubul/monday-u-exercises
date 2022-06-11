class Main {
  constructor() {
    this.itemClient = new ItemClient();
    this.addTaskInput = document.querySelector(".add-task-input");
    this.addTaskBtn = document.querySelector(".add-task-btn");
  }

  async init() {
    this.addTaskInput.addEventListener("input", this.onTaskInput);
    this.addTaskBtn.addEventListener("click", this.addTask);

    await this.renderTasks();
  }

  // Add task will be clickable only for a non empty/"only spaces" task
  onTaskInput() {
    if (!/^\s*$/.test(this.addTaskInput.value)) {
      this.addTaskBtn.classList.add(validTask);
    } else if (/^\s*$/.test(this.addTaskInput.value)) {
      this.addTaskBtn.classList.remove(validTask);
    }
  }

  async renderTasks() {
    const tasksList = document.querySelector(".new-tasks-container");
    tasksList.innerHTML = "";

    const tasks = await this.itemClient.getTasks();

    tasks.forEach((task) => {
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-container");

      taskContainer.appendChild(this.createCheckbox(task.id, task.checked));
      taskContainer.appendChild(this.createTaskText(task.text));
      taskContainer.appendChild(
        this.createDeleteButton(taskContainer, task.id)
      );

      tasksList.appendChild(taskContainer);
    });
  }

  createCheckbox(taskId, isTaskChecked) {
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
  }

  createTaskText(taskText) {
    const textContainer = document.createElement("div");
    textContainer.classList.add("task-txt-container");

    const text = document.createElement("p");
    text.classList.add("task-txt");
    text.innerHTML = taskText;

    textContainer.appendChild(text);
    return textContainer;
  }

  createDeleteButton(taskContainer, taskId) {
    const button = document.createElement("button");
    button.classList.add("trash");

    const image = document.createElement("img");
    image.setAttribute("src", "./images/delete_icon.svg");

    button.appendChild(image);
    button.addEventListener("click", (_) =>
      this.deleteTask(taskContainer, taskId)
    );
    return button;
  }

  async addTask() {
    const task = this.addTaskInput.value;
    if (!isValidTask(task)) return;
    this.itemClient.addTask(task);
    // add task to ui
  }

  async deleteTask(taskContainer, taskId) {
    await this.itemClient.deleteTask(taskId);
  }

  isValidTask(task) {
    // Validate the input isn't empty/contains only spaces
    return !/^\s*$/.test(task);
  }
}

const main = new Main();
main.init();
