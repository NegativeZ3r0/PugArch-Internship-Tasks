import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToggle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonToggle, IonItem, IonList, IonBackButton, IonButtons]
})
export class SettingsPage implements OnInit {

  constructor() { }

  isDarkMode = signal<boolean>(false);

  ngOnInit() {
    // Strictly read if the app currently has the dark mode class applied
    const isCurrentlyDark = document.documentElement.classList.contains('ion-palette-dark');

    // Set the toggle to match the actual active theme
    this.isDarkMode.set(isCurrentlyDark);
  }

  onToggleColorTheme(event: any) {
    const isDark = event.detail.checked;
    this.isDarkMode.set(isDark);

    // Explicitly toggle the official Ionic 8+ dark mode class on the <html> tag
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
  }
}
