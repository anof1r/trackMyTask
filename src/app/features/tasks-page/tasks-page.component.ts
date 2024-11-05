import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BoardApiService } from '../board/board-api.service';
import { Task } from '../types/types';
import { Observable } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { StatusSeverityPipe } from './pipes/severity-pipe';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TableModule, CommonModule, TagModule, StatusSeverityPipe, DropdownModule],
  templateUrl: './tasks-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksPageComponent {
  tasks!: Observable<Task[] | null>;

  constructor(private readonly boardApiService: BoardApiService) {}

  ngOnInit() {
      this.tasks = this.boardApiService.getTasks();
  }
}
