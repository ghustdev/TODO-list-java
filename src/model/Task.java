package model;

import java.time.LocalDate;

public class Task {
	
	private int id;
	private String name;
	private String description;
	private LocalDate dateFinished;
	private int priorityLevel;
	private Status status;
	private String category;
	
	public Task() {}
	
	public Task(String name, String description, LocalDate dateFinished,  Integer priorityLevel, Status status, String category) {
		this.name = name;
		this.description = description;
		this.dateFinished = dateFinished;
		this.priorityLevel = priorityLevel;
		this.status = status;
		this.category = category;
	}
	
	public enum Status {TODO, DOING, DONE}
	
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
	
	public int Comparable(Task other) {
		// Ordenar baseado no nível de prioridade
		return Integer.compare(other.priorityLevel, this.priorityLevel);
	}
}
