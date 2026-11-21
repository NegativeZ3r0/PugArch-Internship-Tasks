// settings.page.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular';

import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonToggle,
    CommonModule,
  ],
})
export class SettingsPage {
  themeService = inject(ThemeService);

  toggleChange(event: CustomEvent): void {
    this.themeService.setDarkTheme(event.detail.checked);
  }
}
