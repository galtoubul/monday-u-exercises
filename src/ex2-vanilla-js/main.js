const validTask = "valid-task-btn"
const newTasks = ".new-tasks-container"


class Main {
  constructor(addTaskBtn, addTaskInput) {
    this.addTaskBtn = addTaskBtn;
    this.addTaskInput = addTaskInput;
    this.diplayedTasksSet = new Set();
    this.todoList;
  }

  init() {
    this.addTaskInput.addEventListener("input", () => this.onTaskInput());

    this.todoList = new ItemManager(
      this.addTaskBtn,
      this.addTaskInput,
      [],
      document.querySelector(".clear-all"),
      {
        onAddTask: (taskId) => this.onAddTask(taskId),
        onTaskDelete: (todoToDelete) => this.onTaskDelete(todoToDelete),
        onCheckUncheckTask: (taskTxt) => this.onCheckUncheckTask(taskTxt),
        onFinishedAll: () => this.onFinishedAll(),
        onClearAll: () => this.onClearAll(),
      }
    );
  }

  // Add task will be clickable only for a non empty/"only spaces" task
  onTaskInput() {
    if (!/^\s*$/.test(this.addTaskInput.value)) {
      this.addTaskBtn.classList.add(validTask);
    } else if (/^\s*$/.test(this.addTaskInput.value)) {
      this.addTaskBtn.classList.remove(validTask);
    }
  }

  clearAddTaskInput() {
    this.addTaskInput.value = "";
    this.addTaskBtn.classList.remove(validTask);
  }

  onAddTask(taskId) {
    // Render tasks
    this.todoList.todos.forEach((todo) => {
      if (!this.diplayedTasksSet.has(todo.id)) {
        document
          .querySelector(newTasks)
          .appendChild(this.createTask(todo));
        this.diplayedTasksSet.add(todo.id);
      }
    });

    this.clearAddTaskInput();
    this.updateTasksLeft();

    // list is empty and first task was added -> hide 'Done and Done' and show footer
    if (this.todoList.todos.length === 1) {
      this.toggleFinishedAllAndFooter();
    }

    const input = document.querySelector(`#task-${taskId}`);
    input.addEventListener("click", (event) => this.onTaskPress(event, taskId));
  }

  onCheckUncheckTask(taskTxtElem) {
    this.updateTasksLeft();
    // Crossing/uncrossing a done task's text
    taskTxtElem.classList.toggle("done-task-txt");
  }

  onTaskPress(event, taskId) {
    const isTaskExist = document.querySelector(`#task-${taskId}`);
    if (isTaskExist) {
      const wasClickedOnTaskValue =
        !document
          .querySelector(`#task-checkbox-${taskId}`)
          .contains(event.target) &&
        !document
          .querySelector(`#trash-button-${taskId}`)
          .contains(event.target);
      if (wasClickedOnTaskValue) {
        alert(document.querySelector(`#task-txt-${taskId}`).innerText);
      }
    }
  }

  onTaskDelete(todoToDelete) {
    document.querySelector(`#task-${todoToDelete.id}`).remove();
    this.diplayedTasksSet.delete(todoToDelete.id);
    this.updateTasksLeft();
  }

  onClearAll() {
    const nodes = document.querySelector(newTasks).childNodes;
    for (let i = nodes.length - 1; i >= 0; i--) {
      nodes[i].remove();
    }
    this.toggleFinishedAllAndFooter();
  }

  // Tasks left
  updateTasksLeft() {
    const tasksLeft = this.todoList.todos.reduce(
      (currTasksLeft, todo) =>
        todo.toBeDone ? currTasksLeft + 1 : currTasksLeft,
      0
    );
    const tasksLeftElem = document.querySelector(".tasks-left");
    tasksLeftElem.innerText = `Keep Grinding! You got ${tasksLeft} to go`;
  }

  createTask({ id: taskId, value }) {
    const task = document.createElement("div");
    task.classList.add("task-container");
    task.id = `task-${taskId}`;
    task.innerHTML = `
        <div class="task-checkbox" id="task-checkbox-${taskId}">
            <input type="checkbox" id="input-${taskId}" />
            <label for="input-${taskId}" />
        </div>
        <div class="task-txt-container">
            <p class="task-txt" id="task-txt-${taskId}" >${value}</p>
        </div>
        <button id="trash-button-${taskId}" class="trash">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" width="20px" height="20px">
                <path d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"/>
            </svg
        </button>
        `;
    return task;
  }

  onFinishedAll() {
    this.toggleFinishedAllAndFooter();
  }

  toggleFinishedAllAndFooter() {
    // Show/hide finished all
    document
      .querySelector(".finished-all-missions")
      .classList.toggle("finished-all-missions-active");
    // Hide/show clear all and left tasks
    document.querySelector(".todo-footer-container").classList.toggle("hide");
  }
}
