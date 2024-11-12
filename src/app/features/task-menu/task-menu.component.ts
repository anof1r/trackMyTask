import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../types/types';

@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [NgClass, NgIf, NgFor],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskMenuComponent {
  @Input() task: Task | null = null;

  //TODO: after close task info cannot open again because null
  closeTaskInfo(): void {
    this.task = null;
  }
  //TODO: move to custom pipe
  statusClass(status: string): string {
    switch (status) {
      case 'TODO': return 'status-todo';
      case 'IN PROGRESS': return 'status-inprogress';
      case 'DONE': return 'status-done';
      case 'IN REVIEW': return 'status-review';
      default: return '';
    }
  }
  
}
