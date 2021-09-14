// Create an alarm
chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 60 * res.timeOption) {
          this.registration.showNotification("Promodoro Timer", {
            body: `${res.timeOption} minutes have passed!`,
            icon: "icon.png",
          });
          // Reset timer values to default when timer is up
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

// Check local storage and set default values if none exist
chrome.storage.local.get(
  ["timer", "isRunning", "timeOption", "alarmSoundOption"],
  (res) => {
    chrome.storage.local.set({
      timer: "timer" in res ? res.timer : 0,
      timeOption: "timeOption" in res ? res.timeOption : 25,
      alarmSoundOption: "alarmSoundOption" in res ? res.alarmSoundOption : true,
      isRunning: "isRunning" in res ? res.isRunning : false,
    });
  }
);

// TODO: Investigate timer starting automatically when first loading extension
