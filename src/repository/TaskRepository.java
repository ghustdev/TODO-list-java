package repository;

import model.Task;
import model.TaskStatus;

import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class TaskRepository {
	DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
	
	String path = "tasks.csv";
	
	// Adicionar tarefas no arquivo
	public void saveTask(List<Task> tasks) {
		try (BufferedWriter bw = new BufferedWriter(new FileWriter(path))) {
			for (Task task : tasks) {
				bw.write(
						task.getId() + ";" +
						task.getName() + ";" +
						task.getDescription() + ";" +
						task.getDateTimeFinished().format(dateTimeFormatter) + ";" +
						task.getPriorityLevel() + ";" +
						task.getCategory() + ";" +
						task.getStatus() + ";" +
						task.isAlarmEnabled() + ";" +
						task.getAlarmAdvanceMinutes()
				);
				bw.newLine();
			}
		}
		catch (IOException e) {
			e.printStackTrace();
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
				if (line.trim().isEmpty()) continue;

				try {
					String[] data = line.split(";");
					if (data.length < 7) continue;

					int  id = Integer.parseInt(data[0]);
					String name = data[1];
					String description =  data[2];
					LocalDateTime dateTimeFinished;
					if (data[3].contains(":")) {
						dateTimeFinished = LocalDateTime.parse(data[3], dateTimeFormatter);
					}
					else {
						// Compatibilidade com o formato antigo sem hora.
						dateTimeFinished = LocalDate.parse(data[3], dtf).atTime(23, 59);
					}
					int priorityLevel =  Integer.parseInt(data[4]);
					String category =  data[5];
					TaskStatus status =  TaskStatus.valueOf(data[6]);
					boolean alarmEnabled = data.length > 7 && Boolean.parseBoolean(data[7]);
					int alarmAdvanceMinutes = data.length > 8 ? Integer.parseInt(data[8]) : 120;
					
					Task task = new Task(id, name, description, dateTimeFinished, priorityLevel, category, status, alarmEnabled, alarmAdvanceMinutes);
					tasks.add(task);
				}
				catch (RuntimeException ignored) {
					// Ignora linha malformada sem derrubar a leitura inteira.
				}
			}
			
			return tasks;
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		
		return tasks;
	}
}
