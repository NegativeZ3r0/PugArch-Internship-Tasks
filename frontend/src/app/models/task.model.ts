// task.model.ts

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string; // Use 'number' if your database uses auto-incrementing integer IDs
  title: string;
  description?: string; // Optional (?) in case a task has no description
  status: TaskStatus;
}

// Used when submitting a "Create Task" form (no ID exists yet)
export type NewTask = Omit<Task, 'id'>;

// Used when updating only specific fields (e.g., toggling status)
export type UpdateTask = Partial<Omit<Task, 'id'>>;
