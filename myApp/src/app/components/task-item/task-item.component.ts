import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel } from '@ionic/angular';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel]
})
export class TaskItemComponent {
  @Input() task!: { title: string; description: string; status: string };
}
