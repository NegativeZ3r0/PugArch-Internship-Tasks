import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TasksService, Task } from '../../services/tasks';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class TaskDetailsPage implements OnInit {
  constructor() { }

  private route = inject(ActivatedRoute);
  private tasksService = inject(TasksService);

  task = signal<Task | undefined>(undefined);

  ngOnInit() {
    // Extract the 'id' parameter from the URL
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.task.set(this.tasksService.getTaskById(taskId));
    }
  }

}
