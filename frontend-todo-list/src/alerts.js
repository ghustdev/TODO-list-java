import { state } from "./model.js";

export function startAlertSystem() {
  checkAlerts();
  setInterval(checkAlerts, 30000); // Check every 30 seconds
}

function checkAlerts() {
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5);

  state.tasks.forEach((task) => {
    if (
      task.alert &&
      task.status !== "DONE" &&
      task.date === currentDate &&
      !state.alertedTasks.has(task.id)
    ) {
      const [taskHour, taskMin] = task.time.split(":").map(Number);
      const [nowHour, nowMin] = currentTime.split(":").map(Number);

      const taskMinutes = taskHour * 60 + taskMin;
      const nowMinutes = nowHour * 60 + nowMin;

      // Alert if within 1 minute
      if (Math.abs(taskMinutes - nowMinutes) <= 1) {
        alert(`⏰ Tarefa: ${task.title} está no horário!`);
        state.alertedTasks.add(task.id);
      }
    }
  });
}
