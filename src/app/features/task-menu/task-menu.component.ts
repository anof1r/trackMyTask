import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../types/types';

@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [NgClass, NgIf],
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
}
