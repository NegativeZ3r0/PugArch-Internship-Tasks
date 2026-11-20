// task-detail.page.ts
import { Component, type OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  ModalController,
  IonBadge,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

import { TaskFormComponent } from '../../components/task-form/task-form.component';
import type { NewTask, TaskStatus } from '../../models/task.model';
import { TasksService } from '../../services/tasks';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonBadge,
  ],
})
export class TaskDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tasksService = inject(TasksService);
  private modalCtrl = inject(ModalController);

  private taskId = signal<string>('');

  // Reactively finds the task from TasksService's tasks() signal
  task = computed(() => this.tasksService.tasks().find((t) => t.id === this.taskId()));

  readonly statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.taskId.set(id);
  }

  onStatusChange(event: CustomEvent): void {
    const current = this.task();
    const status = event.detail.value as TaskStatus | undefined;
    if (current && status) {
      this.tasksService.updateStatus(current.id, status);
    }
  }

  async openEditModal(): Promise<void> {
    const current = this.task();
    if (!current) return;

    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task: current },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss<NewTask>();
    if (role === 'confirm' && data) {
      this.tasksService.updateTask(current.id, data);
    }
  }

  onDeleteTask(): void {
    const current = this.task();
    if (!current) return;

    this.tasksService.deleteTask(current.id);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
