import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../types/types';
import { TaskMenuUiServiceService } from './task-menu-ui-service.service';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, AsyncPipe],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskMenuComponent implements OnChanges {
  @Input() task: Task | null = null;

  protected userNameSubject = new BehaviorSubject<string>('');
  protected readonly userName$ = this.userNameSubject.asObservable();

  constructor(private readonly taskMenuUiService: TaskMenuUiServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task?.assignedUser) {
      this.loadUserName(this.task.assignedUser);
    }
  }

  closeTaskInfo(): void {
    this.task = null;
  }

  private loadUserName(userId: string): void {
    this.taskMenuUiService
      .getUserNameById(userId)
      .subscribe(user => {
        this.userNameSubject.next(user[0].username)
      })
  }

  // TODO: Move this to a custom pipe
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
