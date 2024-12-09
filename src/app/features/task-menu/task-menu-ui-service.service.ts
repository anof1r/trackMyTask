import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskMenuApiServiceService } from './task-menu-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskMenuUiServiceService {
  constructor(private readonly taskMenuApiService: TaskMenuApiServiceService) { }

  getUserNameById(id: string): Observable<any> {
    return this.taskMenuApiService.getUserByID(id)
  }

  updateTask(id: string, updatedTask: any): Observable<any> {
    return this.taskMenuApiService.updateTaskContent(id, updatedTask)
  }
}
