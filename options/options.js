/**
 * Time option controls how long the Pomodoro timer should run for each task
 * The minimum is set to 1 and maximum is set to 60
 */
const timeOption = document.getElementById("time-option");
timeOption.addEventListener("change", (event) => {
  const { value } = event.target;

  // Extra validation to ensure user doesn't set timer above/below thresholds
  if (value < 1 || value > 60) {
    timeOption.value = 25;
  }
});

/**
 * Save button used to save options
 * Resets timer and saves options to local storage
 */
const saveButton = document.getElementById('save-btn')
saveButton.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false
  })
})

// Ensure correct value is being saved for timer input field
chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption;
})