package model;

import java.time.LocalDate;

public class Task {
	
	private int id;
	private String name;
	private String description;
	private LocalDate dateFinished;
	private int priorityLevel;
	private TaskStatus status;
	private String category;
	
	public Task() {}
	
	public Task(int id, String name, String description, LocalDate dateFinished,  Integer priorityLevel, String category, TaskStatus status) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.dateFinished = dateFinished;
		this.priorityLevel = priorityLevel;
		this.category = category;
		this.status = status;
	}
	
	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}
	
	public LocalDate getDateFinished() {
		return dateFinished;
	}
	
	public int getPriorityLevel() {
		return priorityLevel;
	}
	
	public String getCategory() {
		return category;
	}
	
	public TaskStatus getStatus() {
		return status;
	}
}
