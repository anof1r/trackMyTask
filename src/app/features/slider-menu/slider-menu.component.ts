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
    { label: 'Team', route: '/team', icon: 'group' },
  ];

  protected isCollapsed = false;
  protected currentRoute = '';

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
    
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
