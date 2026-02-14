package repository;

import model.Task;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class TaskRepository {
	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	
	String path = "tasks.csv";
	
	// Adicionar tarefas no arquivo
	public void saveTask(List<Task> tasks) {
		try (BufferedWriter bw = new BufferedWriter(new FileWriter(path))) {
			for (Task task : tasks) {
				bw.write(
						task.getName() + ";" +
						task.getDescription() + ";" +
						task.getDateFinished() + ";" +
						task.getDateFinished().format(dtf));
				bw.newLine();
			}
		}
		catch (IOException e) {
			System.out.println("Erro ao salvar dados no arquivo. Erro: " + e.getMessage());
		}
	}
	
	// Ler tarefas do arquivo
	public List<Task> getTasks() {
		List<Task> tasks = new ArrayList<>();
		File file = new File(path);
		
		// Caso a lista seja vazia
		if (!file.exists()) {
			return tasks;
		}
		
		try (BufferedReader br = new BufferedReader(new FileReader(path))) {
			String line;
			while ((line = br.readLine()) != null) {
				String[] data = line.split(";");
				
				String name = data[0];
				String description =  data[1];
				LocalDate dateFinished  = LocalDate.parse(data[2], dtf);
				int priorityLevel =  Integer.parseInt(data[3]);
				Task.Status status =  Task.Status.valueOf(data[4]);
				String category =  data[5];
				
				Task task = new Task(name, description, dateFinished, priorityLevel, status, category);
				tasks.add(task);
			}
		}
		catch (IOException e) {
			System.out.println("Erro ao listar dados no arquivo. Erro: " + e.getMessage());
		}
		catch (NumberFormatException e) {
			System.out.println("Erro ao processar dados no arquivo. Erro: " + e.getMessage());
		}
		
		return tasks;
	}
}
