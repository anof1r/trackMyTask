import { Component, Input } from '@angular/core';
import { Task } from '../types/types';
import { TaskMenuComponent } from '../task-menu/task-menu.component';
import { NgFor } from '@angular/common';
import { TruncatePipe } from './pipes/truncate-pipe';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgFor, TruncatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})

export class TasksComponent {
    @Input() task: Task = {} as Task;
}
