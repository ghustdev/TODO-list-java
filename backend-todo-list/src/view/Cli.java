package view;

import services.AlarmNotifier;

import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class Cli {
	Scanner scanner = new Scanner(System.in);
	DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
	AlarmNotifier alarmNotifier;
	Thread alarmThread;
	
	public void cliMainMenu() {
		startAlarmNotifier();
		CliMenuAction.cliManu(this);
	}
	
	public void cliAddTask() {
		CliAddTaskAction.cliAddTask(this);
	}
	
	public void cliUpdateTask() {
		CliUpdateTaskAction.cliUpdateTask(this);
	}
	
	public void cliListAllTasks() {
		CliListAllTasksAction.cliListAllTasks(this);
	}
	
	public void cliListPerCategory() {
		CliListPerCategoryAction.cliListPerCategory(this);
	}
	
	public void cliListPerPriority() {
		CliListPerPriorityAction.cliListPerPriority(this);
	}
	
	public void cliListPerStatus() {
		CliListPerStatusAction.cliListPerStatus(this);
	}
	
	public void cliFilterPerDate() {
		CliFilterPerDateAction.cliFilterPerDate(this);
	}
	
	public void cliDeleteTask() {
		CliDeleteTaskAction.cliDeleteTask(this);
	}
	
	public void pause() {
		System.out.println("Aperte \"Enter\" para continuar");
		scanner.nextLine();
	}

	public void startAlarmNotifier() {
		if (alarmThread != null && alarmThread.isAlive()) return;

		alarmNotifier = new AlarmNotifier();
		alarmThread = new Thread(alarmNotifier, "alarm-notifier");
		alarmThread.setDaemon(true);
		alarmThread.start();
	}

	public void stopAlarmNotifier() {
		if (alarmNotifier != null) {
			alarmNotifier.stop();
		}
		if (alarmThread != null && alarmThread.isAlive()) {
			alarmThread.interrupt();
		}
	}
}
