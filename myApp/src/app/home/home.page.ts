import { Component, inject, signal, computed } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonListHeader, IonItem, IonSegment, IonSegmentButton, IonButton, IonButtons } from '@ionic/angular';
import { TaskItemComponent } from '../components/task-item/task-item.component';
import { TasksService, Task } from '../services/tasks';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonListHeader, IonItem, IonSegment, IonSegmentButton, IonButtons ,IonButton, RouterModule,
    TaskItemComponent // <-- Add the child component here
  ],
})
export class HomePage {
  // 1. Inject service directly as a property
  private tasksService = inject(TasksService);

  // 2. Define reactive state using Signals
  tasks = signal<Task[]>(this.tasksService.getTasks());
  currentFilter = signal<string>('All');

  // 3. Create a derived state that automatically updates when 'currentFilter' changes
  filteredTasks = computed(() => {
    const filter = this.currentFilter();
    const allTasks = this.tasks();

    if (filter === 'All') {
      return allTasks;
    }
    return allTasks.filter(task => task.status === filter);
  });

  // 4. Event handler for the Ionic segment
  onFilterChange(event: any) {
    this.currentFilter.set(event.detail.value);
  }
  constructor() {}
}
