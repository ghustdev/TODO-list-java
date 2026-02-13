package entities;

import java.time.LocalDate;

public class Task {
	
	private int id;
	private String name;
	private String description;
	private LocalDate dateFinished;
	private Integer priorityLevel;
	private StatusTarefa statusTarefa;
	private String category;
	
	public Task() {}
	
	public Task(String name, String description, LocalDate dateFinished,  Integer priorityLevel, StatusTarefa statusTarefa, String category) {
		this.name = name;
		this.description = description;
		this.dateFinished = dateFinished;
		this.priorityLevel = priorityLevel;
		this.statusTarefa = statusTarefa;
		this.category = category;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public LocalDate getDateFinished() {
		return dateFinished;
	}
	
	public void setDateFinished(LocalDate dateFinished) {
		this.dateFinished = dateFinished;
	}
	
	public Integer getPriorityLevel() {
		return priorityLevel;
	}
	
	public void setPriorityLevel(Integer priorityLevel) {
		this.priorityLevel = priorityLevel;
	}
	
	public StatusTarefa getStatusTarefa() {
		return statusTarefa;
	}
	
	public void setStatusTarefa(StatusTarefa statusTarefa) {
		this.statusTarefa = statusTarefa;
	}
	
	public String getCategory() {
		return category;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public void addTask(String name, String description, LocalDate dateFinished,  Integer priorityLevel, String category, StatusTarefa statusTarefa) {
	
	}
	
	public void removeTask(Integer id) {
	
	}
}
