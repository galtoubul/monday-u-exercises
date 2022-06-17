class TasksController {
  constructor() {
    this.taskManagerClient = new TaskManagerClient();
    this.tasksView = new TasksView({
      deleteTask: (taskContainer, taskId) =>
        this.deleteTask(taskContainer, taskId),
      checkUncheckTask: (
        textContainer,
        taskTxtElem,
        taskId,
        newCheckedStatus
      ) =>
        this.checkUncheckTask(
          textContainer,
          taskTxtElem,
          taskId,
          newCheckedStatus
        ),
    });
    this.addTaskInput = document.querySelector(".add-task-input");
    this.addTaskBtn = document.querySelector(".add-task-btn");
  }

  async init() {
    this.addTaskInput.addEventListener("input", () =>
      this.tasksView.onTaskInput()
    );
    this.addTaskBtn.addEventListener("click", async () => {
      await this.addTask();
    });
    document.addEventListener("keypress", (event) => this.onKeyPress(event));
    const clearAllBtn = document.querySelector(".clear-all");
    clearAllBtn.addEventListener("click", () => this.clearAll());

    await this.getTasks();
  }

  async getTasks() {
    const res = await this.taskManagerClient.getTasks();
    const tasks = res.tasks;
    const tasksLeft = parseInt(res.tasksLeft);
    this.tasksView.onGetTasks(tasks, tasksLeft);
  }

  async addTask() {
    const task = this.addTaskInput.value;
    if (!this.isValidTask(task)) return;
    const res = await this.taskManagerClient.addTask(task);
    if (res.addedTasks.length) {
      this.tasksView.onAddTask(res.addedTasks, res.tasksLeft);
    }
  }

  async deleteTask(taskContainer, taskId) {
    const res = await this.taskManagerClient.deleteTask(taskId);
    this.tasksView.onDeleteTask(taskContainer, res.tasksLeft);
  }

  async clearAll() {
    await this.taskManagerClient.clearAll();
    this.tasksView.onClearAll();
  }

  async checkUncheckTask(textContainer, taskTxtElem, taskId, newCheckedStatus) {
    const res = await this.taskManagerClient.checkUncheckTask(
      taskId,
      newCheckedStatus
    );
    this.tasksView.onCheckUncheckTask(taskTxtElem, res.tasksLeft);
    const doneTime = "doneTime" in res ? res.doneTime : null;
    console.log(res);
    this.tasksView.updateDoneTimeStamp(textContainer, doneTime);
  }

  isValidTask(task) {
    // Validate the input isn't empty/contains only spaces
    return !/^\s*$/.test(task);
  }

  async onKeyPress(event) {
    if (event.key === "Enter") {
      const inputElem = document.querySelector(".add-task-input");
      if (inputElem === document.activeElement) {
        await this.addTask();
      }
    }
  }
}

const tasksController = new TasksController();
tasksController.init();
