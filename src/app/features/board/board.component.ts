import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { sections } from '../constants/constants';
import { Section, Task } from '../types/types';
import { TasksComponent } from "../tasks/tasks.component";
import { BoardUiService } from './board-ui.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NgFor, TasksComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {

  protected sections = sections // refactor to api call

  constructor(protected readonly boardUiService: BoardUiService) {
    this.boardUiService.getTasks().pipe(tap(console.log)).subscribe()
  }
  
  get connectedLists(): string[] {
    return this.sections.map((_, index) => 'list' + index);
  }

  drop(event: CdkDragDrop<Task[]>, section: Section) {
    if (event.previousContainer === event.container) {
      moveItemInArray(section.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        section.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
