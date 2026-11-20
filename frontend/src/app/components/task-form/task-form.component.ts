// task-form.component.ts
import { Component, inject, Input, type OnInit, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular';

import type { NewTask, Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
  ],
})
export class TaskFormComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private modalCtrl = inject(ModalController);

  @Input() task: Task | null = null;

  edit = output<Task>();
  save = output<NewTask>();
  cancelSignal = output<void>();

  get isEditMode(): boolean {
    return this.task !== null;
  }

  readonly statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: [''],
    status: this.fb.control<TaskStatus>('pending'),
  });

  ngOnInit(): void {
    this.form.reset({
      title: this.task?.title ?? '',
      description: this.task?.description ?? '',
      status: this.task?.status ?? 'pending',
    });
  }

  onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit(): void {
    const raw = this.form.getRawValue();
    const trimmedTitle = raw.title.trim();

    if (this.form.invalid || !trimmedTitle) {
      this.form.markAllAsTouched();
      return;
    }

    const trimmedDesc = raw.description.trim();

    this.modalCtrl.dismiss(
      {
        title: trimmedTitle,
        description: trimmedDesc || undefined,
        status: raw.status,
      } satisfies NewTask,
      'confirm'
    );
  }
}
