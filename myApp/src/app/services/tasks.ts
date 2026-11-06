import { Service } from '@angular/core';

export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}

@Service()
export class TasksService {

  private mockTasks: Task[] = [
    {
      title: "Configure CI/CD Pipeline",
      description: "Set up GitHub Actions to automate testing and deployment for the main branch.",
      status: "Completed"
    },
    {
      title: "Implement User Authentication",
      description: "Integrate JWT-based login and registration endpoints using Node.js.",
      status: "In Progress"
    },
    {
      title: "Design Database Schema",
      description: "Create an ER diagram and draft SQL tables for the inventory management module.",
      status: "To Do"
    },
    {
      title: "Optimize API Performance",
      description: "Implement Redis caching on the product catalog endpoint to reduce latency.",
      status: "To Do"
    }
  ];

  constructor() { }

  getTasks(): Task[] {
    return this.mockTasks;
  }
}
