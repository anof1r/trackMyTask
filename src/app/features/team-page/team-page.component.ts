import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, CardModule } from 'primeng/card';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [NgFor, CardModule],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPageComponent {
  teamMembers = [
    { name: 'Denis', role: 'Frontend Developer', avatarUrl: 'assets/img/mm.png' },
    { name: 'Alexandr', role: 'Backend Developer', avatarUrl: 'assets/img/mdd.jpg' },
    { name: 'Oleg', role: 'Fullstack Developer', avatarUrl: 'assets/img/mdd.jpg' },
  ];
}
