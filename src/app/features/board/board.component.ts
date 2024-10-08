import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { sections } from '../constants/constants';
import { Section } from '../types/types';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NgFor],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {

  protected sections = sections

  get connectedLists(): string[] {
    return this.sections.map((_, index) => 'list' + index);
  }

  drop(event: CdkDragDrop<string[]>, section: Section) {
    if (event.previousContainer === event.container) {
      moveItemInArray(section.tasks, event.previousIndex, event.currentIndex);
    } else {
      console.log(section);

      transferArrayItem(
        event.previousContainer.data,
        section.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
