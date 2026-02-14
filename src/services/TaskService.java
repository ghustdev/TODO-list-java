package services;

import model.Task;
import model.TaskStatus;
import repository.TaskRepository;

import java.time.LocalDate;
import java.util.List;

public class TaskService {
	TaskRepository repository = new TaskRepository();
	
	public void addTask(String name, String description, LocalDate dateFinished,  Integer priorityLevel, String category, TaskStatus status) {
		List<Task> listTasks = repository.getTasks();
		
		int maxId = listTasks.stream().mapToInt(Task::getId).max().orElse(0) + 1;
		
		Task newTask = new Task(maxId, name, description, dateFinished, priorityLevel, category, status);
		listTasks.add(newTask);
		repository.saveTask(listTasks);
	}
	
	public List<Task> listTasks () {
		return repository.getTasks();
	}
	
	public boolean deleteTask(int id) {
		List<Task> listTasks = repository.getTasks();
		
		boolean removedId = listTasks.removeIf(t -> t.getId() == id);
		
		if (removedId) {
			repository.saveTask(listTasks);
			return true;
		}
		return false;
	}
}
