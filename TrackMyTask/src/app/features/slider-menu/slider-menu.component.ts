import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider-menu',
  standalone: true,
  imports: [NgFor],
  templateUrl: './slider-menu.component.html',
  styleUrl: './slider-menu.component.scss'
})
export class SliderMenuComponent {
  menuItems = [
    { label: 'Доска', route: '/board', icon: 'dashboard' },
    { label: 'Задачи', route: '/tasks', icon: 'task' },
    { label: 'Команда', route: '/team', icon: 'group' }
  ];

  constructor(private router: Router) {}

  // Метод для навигации при клике на пункт меню
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
