import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../types/types';
import { BoardApiService } from './board-api.service';

@Injectable({
  providedIn: 'root'
})

export class BoardUiService {
  tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private boardApiService: BoardApiService) {}

  loadTasks(): void {
    this.boardApiService.getTasks().subscribe((tasks: Task[]) => {      
      this.tasksSubject.next(tasks);
    });
  }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  updateTaskLocally(taskId: string, newStatus: string) {
    console.log('ui-service local update => ', taskId, newStatus);
    
    const updatedTasks = this.getTasks().map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    this.tasksSubject.next(updatedTasks as Task[]);
  }
}
