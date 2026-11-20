// tasks.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import type { Task, TaskStatus, NewTask, UpdateTask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  private _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  constructor() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => this._tasks.set(data),
      error: (err) => console.error('Failed to load tasks:', err),
    });
  }

  getTaskById(id: string): Task | undefined {
    return this._tasks().find((task) => String(task.id) === id);
  }

  addTask(newTask: NewTask): void {
    this.http.post<Task>(this.apiUrl, newTask).subscribe({
      next: (createdTask) => {
        this._tasks.update((list) => [createdTask, ...list]);
      },
      error: (err) => console.error('Failed to add task:', err),
    });
  }

  updateTask(id: string, changes: UpdateTask): void {
    this.http.patch<Task>(`${this.apiUrl}/${id}`, changes).subscribe({
      next: (updatedTask) => {
        this._tasks.update((list) =>
          list.map((t) => (t.id === id ? updatedTask : t))
        );
      },
      error: (err) => console.error('Failed to update task:', err),
    });
  }

  updateStatus(id: string, status: TaskStatus): void {
    this.updateTask(id, { status });
  }

  deleteTask(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this._tasks.update((list) => list.filter((t) => t.id !== id));
      },
      error: (err) => console.error('Failed to delete task:', err),
    });
  }
}
