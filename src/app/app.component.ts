declare global {
  interface Window {
    Telegram: any;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'data-entry-form';
  photoPreview: string = 'https://storage.yandexcloud.net/my-video-frames/Avatar%20Preview/image%202.png';
  user: any = null;

  constructor() {
    this.getTelegramUser();
  }

  ngOnInit() {
    this.loadTelegramUser();
  }

  getTelegramUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = urlParams.get('user');

    if (userData) {
      this.user = JSON.parse(decodeURIComponent(userData));
    }
  }

  loadTelegramUser() {
    if (window.Telegram && window.Telegram.WebApp) {
      const userData = window.Telegram.WebApp.initDataUnsafe.user;
      if (userData) {
        this.user = userData;
      } else {
        console.error("Не удалось получить данные пользователя Telegram.");
      }
    } else {
      console.error("Telegram WebApp API не доступен.");
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  submitForm() {
    console.log("Форма отправлена!");
  }
}