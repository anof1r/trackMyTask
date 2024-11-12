import { Component, Input } from '@angular/core';
import { Task } from '../types/types';
import { TaskMenuComponent } from '../task-menu/task-menu.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskMenuComponent, NgFor],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})

export class TasksComponent {
    @Input() task: Task = {} as Task;
}
