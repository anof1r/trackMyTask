import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Task } from '../types/types';
import { TasksComponent } from "../tasks/tasks.component";
import { BoardUiService } from './board-ui.service';
import { BoardApiService } from './board-api.service';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, TasksComponent, DragDropModule],
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

  sections$: Observable<{ status: string, tasks: Task[] }[]>;


  constructor(protected readonly boardUiService: BoardUiService, private cd: ChangeDetectorRef, protected readonly boardApiService: BoardApiService) {
    this.boardUiService.loadTasks()

    this.sections$ = this.boardUiService.tasks$.pipe(
      map(tasks => this.sections.map(section => ({
        status: section.status,
        tasks: tasks.filter((t: Task) => t.status.toLowerCase() === section.status.toLowerCase())
      })))
    );

  }
  ngOnInit(): void {
    this.boardUiService.loadTasks()
  }

  get connectedLists(): string[] {
    return this.sections.map((_, index) => 'list' + index);
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

      this.boardApiService.updateTaskStatus(task.id, newStatus).subscribe((res: any) => {

        const tasksArray = res.updatedTasks;

        this.boardUiService.tasksSubject.next(tasksArray);

        this.cd.detectChanges();
      });
    }
  }

}
