const addTaskButton = document.getElementById("add-task-btn");
addTaskButton.addEventListener("click", () => addTask());

/**
 * Adds a new task input element with a button
 */
function addTask() {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "X";

  taskRow.appendChild(text);
  taskRow.append(deleteButton);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}
