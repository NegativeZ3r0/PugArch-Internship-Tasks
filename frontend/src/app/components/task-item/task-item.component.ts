// task-item.component.ts
import { Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonItem, IonLabel, IonChip, IonSelect, IonSelectOption, IonButton, IonIcon, IonRippleEffect} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';

import type { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonChip,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    RouterModule,
    IonRippleEffect,
  ],
})
export class TaskItemComponent {
  task = input.required<Task>();

  edit = output<Task>();
  statusChange = output<{ id: string; status: TaskStatus }>();
  delete = output<string>();

  readonly statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  // Dynamically maps status to Ionic theme colors
  statusColor = computed(() => {
    switch (this.task().status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'medium';
    }
  });

  constructor() {
    addIcons({ trashOutline, createOutline});
  }

  onStatusSelect(event: CustomEvent): void {
    const newStatus = event.detail.value as TaskStatus;
    this.statusChange.emit({ id: this.task().id, status: newStatus });
  }
}
