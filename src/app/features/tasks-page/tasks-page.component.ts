import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MOCK_TABLE_DATA, TABLE_TASKS } from '../consts/consts';
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './tasks-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksPageComponent {
  tasks!: any[];

  constructor() {}

  ngOnInit() {
      this.tasks = TABLE_TASKS
  }
}
