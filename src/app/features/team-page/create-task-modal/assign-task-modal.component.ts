import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignTaskModalUiServieService } from './assign-task-ui-servie.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-assign-task-modal',
  templateUrl: './assign-task-modal.component.html',
  styleUrls: ['./assign-task-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
})
export class AssignTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() taskSelected = new EventEmitter<any>();

  @Input() userId: string | null = null;
  
  protected usersSubject = new BehaviorSubject<any[]>([]);
  protected users$ = this.usersSubject.asObservable();
  protected taskForm: FormGroup;
  protected tasksSubject = new BehaviorSubject<any[]>([]);
  protected tasks$ = this.tasksSubject.asObservable();

  constructor(private fb: FormBuilder, private uiService: AssignTaskModalUiServieService) {
    this.taskForm = this.fb.group({
      taskId: ['', Validators.required],
    });

    this.getAllTasks()
  }
  
  submit(): void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      
      this.taskSelected.emit({
        ...this.taskForm.value,
        userId: this.userId,
      });

      this.cancel();
    }
  }

  getUsers() {
    this.uiService.getUsers().subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  getAllTasks() {
    this.uiService.getTasks().pipe().subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  cancel(): void {
    this.close.emit();
  }
}
