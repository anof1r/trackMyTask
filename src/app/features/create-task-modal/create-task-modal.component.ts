import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTaskModalUiServieService } from './create-task-modal-ui-servie.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
})
export class CreateTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<any>();

  protected usersSubject = new BehaviorSubject<any[]>([]);
  protected users$ = this.usersSubject.asObservable();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private uiService: CreateTaskModalUiServieService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TODO', Validators.required],
      story_points: [1, Validators.required],
      priority: [['']],
      assigned_user: [''],
      deadline:['', Validators.required],
    });

    this.getUsers()
  }
  
  submit(): void {
    if (this.taskForm.valid) {
      const deadlineDate = new Date(this.taskForm.value.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      const formattedDeadline = deadlineDate.toISOString().split('T').join(' ').split('.').shift();

      this.taskCreated.emit({
        ...this.taskForm.value,
        created_at: new Date().toISOString(),
        deadline: formattedDeadline
      });

      this.cancel();
    }
  }

  getUsers() {
    this.uiService.getUsers().subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  cancel(): void {
    this.close.emit();
  }
}
