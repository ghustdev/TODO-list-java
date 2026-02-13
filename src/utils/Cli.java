package utils;

import entities.Task;

import java.time.LocalDate;
import java.util.Scanner;

public class Cli {
	
	public int cliMainMenu (Scanner scanner) {
		while (true) {
			try {
				System.out.println("+================================================+");
				System.out.println("|            Gerenciador de Tarefas              |");
				System.out.println("+================================================+");
				System.out.println("\nSelecione uma ação:");
				System.out.println("[1] - Adicionar Tarefa");
				System.out.println("[2] - Editar Tarefa");
				System.out.println("[3] - Listar Tarefa");
				System.out.println("[4] - Excluir Tarefa");
				System.out.println("[0] - Encerrar programa");
				System.out.println("+================================================+");
				System.out.println("Por enquanto, apenas Adicioner, Editar, Listar e Encerrar funcionam");
				System.out.println("+================================================+");
				
				int optionMenu = scanner.nextInt();
				
				if (optionMenu == 1) {
					Task task = new Task();
					
				}
				else if (optionMenu == 2) {
				
				}
				else if (optionMenu == 3) {
				
				}
				else if (optionMenu == 4) {
				
				}
				else if (optionMenu == 0) {
					break;
				}
				else {
					System.out.println("+================================================+");
					System.out.println("Erro: Insira uma opção válida");
					System.out.println("+================================================+");
					System.out.println("Aperte \"Enter\" para continuar");
					scanner.nextLine();
				}
			}
			catch (Exception e) {
				System.out.println("Adicione a entrada correta (números de 0 - 4). Erro: " + e.getMessage());
			}
		}
	}
	
	public int cliAddTask (Scanner scanner) {
		try {
			System.out.println("+================================================+");
			System.out.println("|               Adicionar Tarefa                 |");
			System.out.println("+================================================+");
			System.out.print("\nNome: ");
			String nome = scanner.nextLine();
			
			System.out.print("\nNome: ");
			LocalDate dateFinished = scanner.nextDate;
			
			System.out.print("\nDescrição: ");
			String description = scanner.nextLine();
			
			System.out.print("\nNome: ");
			String nome = scanner.nextLine();
			
			System.out.print("\nNome: ");
			String nome = scanner.nextLine();
			
			
			System.out.println("[1] - Adicionar Tarefa");
			System.out.println("[2] - Editar Tarefa");
			System.out.println("[3] - Listar Tarefa");
			System.out.println("[4] - Excluir Tarefa");
			System.out.println("[0] - Encerrar programa");
			System.out.println("+================================================+");
			System.out.println("Por enquanto, apenas Adicioner, Editar, Listar e Encerrar funcionam");
			System.out.println("+================================================+");
			Scanner scanner = new Scanner(System.in);
		}
	}
	
	public int cliRemoveTask (Scanner scanner) {
	
	}
}
