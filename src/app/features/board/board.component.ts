import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Task } from '../types/types';
import { TasksComponent } from "../tasks/tasks.component";
import { BoardUiService } from './board-ui.service';
import { BoardApiService } from './board-api.service';
import { map, Observable } from 'rxjs';
import { TaskMenuComponent } from '../task-menu/task-menu.component';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, TasksComponent,TaskMenuComponent, DragDropModule, CreateTaskModalComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent implements OnInit {

  protected sections: { status: string, tasks: Task[] }[] = [
    { status: 'TODO', tasks: [] },
    { status: 'In Progress', tasks: [] },
    { status: 'In Review', tasks: [] },
    { status: 'Done', tasks: [] },
  ];
  protected isCreateTaskModalOpen = false;

  sections$: Observable<{ status: string, tasks: Task[] }[]>;
  protected selectedTask: Task | null = null;

  constructor(protected readonly boardUiService: BoardUiService, protected readonly boardApiService: BoardApiService) {
    this.sections$ = this.boardUiService.tasks$.pipe(
      map(tasks => this.sections.map(section => ({
        status: section.status,
        tasks: tasks.filter((task: Task) => task.status.toLowerCase() === section.status.toLowerCase())
      })))
    );
  }

  ngOnInit(): void {
    this.boardUiService.loadTasks()
  }

  onTaskUpdated(): void {
    this.boardUiService.loadTasks();
  }

  get connectedLists(): string[] {
    return this.sections.map((_, index) => 'list' + index);
  }

  onSelectTask(task: Task): void {
    this.selectedTask = task;
  }

  openModal(): void {    
    this.isCreateTaskModalOpen = true;
  }

  closeCreateTaskModal(): void {
    this.isCreateTaskModalOpen = false;
  }

  onTaskCreated(task: Task): void {
    this.boardApiService.createTask(task).subscribe(() => {
      this.boardUiService.loadTasks()
    });
  }
  

  drop(event: CdkDragDrop<Task[]>, section: any) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const task = event.container.data[event.currentIndex];
      const newStatus = section.status;

      this.boardApiService.updateTaskStatus(task.id, newStatus).subscribe();
    }
  }

}
