import { Component, Input } from '@angular/core';
import { Task } from '../types/types';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})

export class TasksComponent {
    @Input() task: Task | undefined
}
