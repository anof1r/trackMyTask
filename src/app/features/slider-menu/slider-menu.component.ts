import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider-menu',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './slider-menu.component.html',
  styleUrl: './slider-menu.component.scss'
})
export class SliderMenuComponent {
  menuItems = [
    { label: 'Board', route: '/board', icon: 'dashboard' },
    { label: 'Tasks', route: '/tasks', icon: 'task' },
    { label: 'Team', route: '/team', icon: 'group' }
  ];

  isCollapsed = false;
  currentRoute = '';

  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
