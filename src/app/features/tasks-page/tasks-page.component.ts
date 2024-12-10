import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BoardApiService } from '../board/board-api.service';
import { Task } from '../types/types';
import { Observable } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { StatusSeverityPipe } from './pipes/severity-pipe';
import { DropdownModule } from 'primeng/dropdown';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TableModule, CommonModule, TagModule, StatusSeverityPipe, DropdownModule, CreateTaskModalComponent],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksPageComponent {
  protected tasks!: Observable<Task[] | null>;
  protected isCreateTaskModalOpen = false;

  constructor(private readonly boardApiService: BoardApiService) {}

  ngOnInit() {
      this.tasks = this.boardApiService.getTasks();
  }

  openModal(): void {    
    this.isCreateTaskModalOpen = true;
  }

  closeCreateTaskModal(): void {
    this.isCreateTaskModalOpen = false;
  }

  onTaskCreated(task: Task): void {
    this.boardApiService.createTask(task).subscribe(() => {
      this.tasks = this.boardApiService.getTasks();
    });
  }
}
