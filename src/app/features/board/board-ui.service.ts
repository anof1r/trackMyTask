import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, of } from 'rxjs';
import { Task, BOARD_SECTIONS } from '../types/types';
import { BoardApiService } from './board-api.service';

const TASKS_STORAGE_KEY = 'trackMyTask_tasks';

@Injectable({
  providedIn: 'root'
})

export class BoardUiService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  tasks$ = this.tasksSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private boardApiService: BoardApiService) {
    this.loadTasksFromLocalStorage();
  }

  loadTasks(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.boardApiService.getTasks().pipe(
      tap((tasks: Task[]) => {
        this.tasksSubject.next(tasks);
        this.saveTasksToLocalStorage(tasks);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('Error loading tasks:', error);
        this.errorSubject.next('Не удалось загрузить задачи. Используются кэшированные данные.');
        this.loadingSubject.next(false);
        // Return cached tasks on error
        return of(this.tasksSubject.getValue());
      })
    ).subscribe();
  }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  updateTaskLocally(taskId: string, newStatus: string) {
    const updatedTasks = this.getTasks().map(task => {
      if (task.id === taskId) {
        // Convert string status to BOARD_SECTIONS enum
        const statusMap: Record<string, BOARD_SECTIONS> = {
          'TODO': BOARD_SECTIONS.todo,
          'In Progress': BOARD_SECTIONS.inProgress,
          'IN PROGRESS': BOARD_SECTIONS.inProgress,
          'In Review': BOARD_SECTIONS.inReview,
          'IN REVIEW': BOARD_SECTIONS.inReview,
          'Done': BOARD_SECTIONS.done,
          'DONE': BOARD_SECTIONS.done
        };
        const status = statusMap[newStatus] || newStatus as BOARD_SECTIONS;
        return { ...task, status };
      }
      return task;
    });

    this.tasksSubject.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private loadTasksFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        const tasks = JSON.parse(stored);
        this.tasksSubject.next(tasks);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
