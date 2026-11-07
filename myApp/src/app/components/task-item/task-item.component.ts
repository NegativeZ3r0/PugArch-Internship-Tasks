import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel, RouterModule]
})
export class TaskItemComponent {
  @Input() task!: { id: string; title: string; description: string; status: string };
}
