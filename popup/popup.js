let tasks = [];

const addTaskButton = document.getElementById("add-task-btn");
addTaskButton.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

/**
 * Save the tasks to chrome storage
 */
function saveTasks() {
  chrome.storage.sync.set({ tasks });
}

/**
 * Render a single task
 * @param {String} taskNum the number of the task to render
 */
function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "X";
  deleteButton.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.append(deleteButton);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

/**
 * Adds a new task input element with a button
 */
function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

/**
 * Remove a task from the list
 * @param {String} taskNum the number of the task to remove
 */
function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

/**
 * Render all tasks
 */
function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
