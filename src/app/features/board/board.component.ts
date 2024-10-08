import { ChangeDetectorRef, Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NgFor],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  todo = ['TODO 1', 'TODO 2'];
  inProgress = ['inProgress 3'];
  inReview = ['inReview 4'];
  done = ['done 5'];

  sections = [
    { title: 'TODO', tasks: this.todo },
    { title: 'In Progress', tasks: this.inProgress },
    { title: 'In Review', tasks: this.inReview },
    { title: 'Done', tasks: this.done },
  ];
  
constructor(private cd: ChangeDetectorRef){

}

get connectedLists(): string[] {
  return this.sections.map((_, index) => 'list' + index);
}

drop(event: CdkDragDrop<string[]>, section: any) {
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
