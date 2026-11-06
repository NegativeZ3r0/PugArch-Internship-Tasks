import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonListHeader } from '@ionic/angular';
import { TaskItemComponent } from '../components/task-item/task-item.component';

type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonListHeader,
    TaskItemComponent // <-- Add the child component here
  ],
})
export class HomePage {

  // Feed the mock data to the template
  mockTasks: Task[] = [
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

  constructor() {}
}
