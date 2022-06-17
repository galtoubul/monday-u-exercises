const validTask = "valid-task-btn";
const doneTimeClass = "done-time-container";

class TasksView {
  constructor(callbacks) {
    this.addTaskInput = document.querySelector(".add-task-input");
    this.addTaskBtn = document.querySelector(".add-task-btn");
    this.tasksList = document.querySelector(".new-tasks-container");
    this.callbacks = callbacks;
  }

  addTasksToView(tasks) {
    this.hideFinishedAll();

    tasks.forEach((task) => {
      this.tasksList.appendChild(
        createTask(
          task.id,
          task.itemName,
          task.checked,
          task.doneTime,
          this.callbacks
        )
      );
    });
  }

  onGetTasks(tasks, tasksLeft) {
    if (tasks.length) {
      this.addTasksToView(tasks);
      if (tasksLeft) {
        this.updateTasksLeft(tasksLeft);
      } else {
        this.showFinishedAll();
      }
    } else {
      this.showFinishedAll();
    }
  }

  onAddTask(addedTasks, tasksLeft) {
    this.clearAddTaskInput();
    this.addTasksToView(addedTasks);
    this.updateTasksLeft(tasksLeft);
  }

  onDeleteTask(taskContainer, tasksLeft) {
    taskContainer.remove();
    if (tasksLeft) {
      this.updateTasksLeft(tasksLeft);
    } else {
      this.showFinishedAll();
    }
  }

  onClearAll() {
    this.tasksList.innerHTML = "";
    this.showFinishedAll();
  }

  onCheckUncheckTask(taskTxtElem, tasksLeft) {
    taskTxtElem.classList.toggle("done-task-txt");
    if (tasksLeft) {
      this.updateTasksLeft(tasksLeft);
      this.hideFinishedAll();
    } else {
      this.showFinishedAll();
    }
  }

  checkTasksById(checkedTaskId) {
    const taskTxtElem = document.querySelector(`#task-txt-${checkedTaskId}`);
    taskTxtElem.classList.toggle("done-task-txt");
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

  updateTasksLeft(tasksLeftNum) {
    const tasksLeftElem = document.querySelector(".tasks-left-number");
    tasksLeftElem.innerText = tasksLeftNum;
  }

  updateDoneTimeStamp(textContainer, doneTime) {
    if (doneTime) {
      textContainer.appendChild(createDoneTimeStamp(doneTime));
    } else {
      this.removeDoneTimeStamp(textContainer);
    }
  }

  removeDoneTimeStamp(textContainer) {
    // The done timestamp is appended as a last child only
    const lastChild = textContainer.lastChild;
    if (lastChild.classList.contains(doneTimeClass)) {
      textContainer.removeChild(lastChild);
    }
  }

  hideFinishedAll() {
    // Hide finished all
    document
      .querySelector(".finished-all-missions")
      .classList.remove("finished-all-missions-active");
    // Show clear all and left tasks
    document.querySelector(".todo-footer-container").classList.remove("hide");
  }

  showFinishedAll() {
    // Show finished all
    document
      .querySelector(".finished-all-missions")
      .classList.add("finished-all-missions-active");
    // Hide clear all and left tasks
    document.querySelector(".todo-footer-container").classList.add("hide");
  }
}
