import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../types/types';
import { TaskMenuUiServiceService } from './task-menu-ui-service.service';
import { BehaviorSubject, tap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, AsyncPipe, ReactiveFormsModule],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskMenuComponent implements OnChanges, OnInit {
  @Input() task: Task | null = null;
  @Output() tasksUpdated = new EventEmitter<void>();


  protected taskForm: FormGroup | null = null;
  protected isEditMode = false;
  protected userNameSubject = new BehaviorSubject<string>('');
  protected readonly userName$ = this.userNameSubject.asObservable();

  constructor(private readonly taskMenuUiService: TaskMenuUiServiceService, private fb: FormBuilder) { }

  onTaskUpdated() {
    this.tasksUpdated.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task?.assignedUser) {
      this.loadUserName(this.task.assignedUser);
    }
  }

  ngOnInit(): void {
    if (this.task) {
      this.initForm();
      this.taskMenuUiService
        .getUserNameById(this.task.assignedUser).pipe(tap(console.log))
        .subscribe((user) => this.userNameSubject.next(user[0].username));
    }
  }

  private initForm(): void {
    if (!this.task) return;
    console.log('initFrom method => ', this.task);
    
    this.taskForm = this.fb.group({
      title: [this.task.title],
      description: [this.task.description],
      status: [this.task.status],
      story_points: [this.task.story_points],
      labels: [this.task.labels.join(', ')],
    });
  }

  onSubmit(): void {
    if (!this.task || !this.taskForm) return;

    const updatedTask = {
      ...this.task,
      ...this.taskForm.value,
      labels: this.taskForm.value.labels.split(',').map((label: string) => label.trim()),
    };
    console.log(updatedTask);
    
    this.taskMenuUiService.updateTask(updatedTask.id, updatedTask).subscribe(() => {
      this.task = updatedTask;
      this.toggleEditMode();

      this.onTaskUpdated()
    });

    this.closeTaskInfo()
  }

  closeTaskInfo(): void {
    this.task = null;
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode && this.task) {
      this.initForm();
    }
  }

  private loadUserName(userId: string): void {
    this.taskMenuUiService
      .getUserNameById(userId)
      .subscribe(user => {
        this.userNameSubject.next(user[0].username)
      })
  }

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
