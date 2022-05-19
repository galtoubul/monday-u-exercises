const addTaskInput = document.querySelector(".add-task-input");
let taskId = 0;
let tasksCnt = 0;

// Add task
const addTaskBtn = document.querySelector(".add-task-btn");
addTaskBtn.addEventListener("click", (event) => onAddTask(event));

const createTask = () => {
  const task = document.createElement("div");
  task.classList.add("task-container");
  task.id = `task-${taskId}`;
  task.innerHTML = `
    <div>
        <input type="checkbox" id="input-${taskId}" />
        <label class="task-txt" for="input-${taskId}">${addTaskInput.value}</label>
    </div>
    <button id="trash-button-${taskId}" class="trash">
        <svg id="trash-svg-${taskId}" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" width="20px" height="20px">
            <path id="trash-path-${taskId}" d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z"/>
        </svg>
    </button>
    `;
  taskId++;
  return task;
};

const onAddTask = (event) => {
  document.querySelector(".tasks-container").appendChild(createTask());
  addTaskInput.value = "";

  tasksCnt++;
  updateTasksLeft();
  if (tasksCnt === 1) {
    document.querySelector(".todo-footer-container").classList.toggle("hide");
    document.querySelector(".finished-all-missions").classList.toggle("hide");
  }

  const trashBtn = document.querySelector(`#trash-button-${taskId - 1}`);
  trashBtn.addEventListener("click", (event) => onTaskDelete(event));
};

// Delete task
const onTaskDelete = (event) => {
  const clickedId = event.target.id;
  const taskIdToRemove = clickedId.slice(clickedId.lastIndexOf("-") + 1);
  document.querySelector(`#task-${taskIdToRemove}`).remove();

  tasksCnt--;
  updateTasksLeft();

  if (!tasksCnt) {
    document.querySelector(".todo-footer-container").classList.toggle("hide");
    document.querySelector(".finished-all-missions").classList.toggle("hide");
  }
};

// Clear all
const clearAllBtn = document.querySelector(".clear-all");
clearAllBtn.addEventListener("click", (event) => onClearAll(event));

const onClearAll = (event) => {
  for (let taskIdToRemove = 0; taskIdToRemove < taskId; taskIdToRemove++) {
    document.querySelector(`#task-${taskIdToRemove}`).remove();
  }
};

// Tasks left
const updateTasksLeft = () => {
  const tasksLeft = document.querySelector(".tasks-left");
  tasksLeft.innerText = `Keep Grinding! You got ${tasksCnt} to go`;
};
