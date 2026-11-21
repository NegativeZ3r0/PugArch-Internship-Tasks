// home.page.ts
import { Component, inject, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonFab, IonFabButton, IonIcon, ModalController, IonButtons, IonButton } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, settingsOutline } from 'ionicons/icons';

import { TaskFormComponent } from '../components/task-form/task-form.component';
import { TaskItemComponent } from '../components/task-item/task-item.component';
import type { Task, TaskStatus, NewTask } from '../models/task.model';
import { TasksService } from '../services/tasks';

type TaskFilter = 'all' | TaskStatus;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton,
    IonSegment, IonSegmentButton, IonLabel, IonList, IonFab, IonFabButton, RouterModule,
    TaskItemComponent],
})
export class HomePage {
  private tasksService = inject(TasksService);
  tasks = this.tasksService.tasks;

  selectedFilter = signal<TaskFilter>('all');
  editingTask = signal<Task | null>(null);

  private modalCtrl = inject(ModalController);

  readonly filterOptions: {
    value: TaskFilter; label: string
  }[] = [
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Pending' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
    ];

  filteredTasks = computed(() => {
    const filter = this.selectedFilter();
    const list = this.tasks();
    return filter === 'all' ? list : list.filter(t => t.status === filter);
  });

  constructor() {
    addIcons({ addOutline, settingsOutline });
  }

  onFilterChange(event: CustomEvent): void {
    const value = event.detail.value as TaskFilter | undefined;
    if (value) {
      this.selectedFilter.set(value);
    }
  }

  async openAddModal(): Promise<void> {
    await this.openTaskModal(null);
  }

  async openEditModal(task: Task): Promise<void> {
    await this.openTaskModal(task);
  }

  private async openTaskModal(task: Task | null): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss<NewTask>();
    if (role === 'confirm' && data) {
      if (task) {
        this.tasksService.updateTask(task.id, data);
      } else {
        this.tasksService.addTask(data);
      }
    }
  }

  onSaveTask(data: NewTask): void {
    const current = this.editingTask();
    if (current) {
      this.tasksService.updateTask(current.id, data);
    } else {
      this.tasksService.addTask(data);
    }
  }

  onStatusChange(event: { id: string; status: TaskStatus }): void {
    this.tasksService.updateStatus(event.id, event.status);
  }

  onDeleteTask(id: string): void {
    this.tasksService.deleteTask(id);
  }
}
