import { Injectable } from '@angular/core';
import { BoardApiService } from './board-api.service';
import { Task } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class BoardUiService {

  protected todoTaskList: Task[] | null = null
  protected inProgressTaskList: Task[] | null = null
  protected inReviewTaskList: Task[] | null = null
  protected doneTaskList: Task[] | null = null

  constructor(private boardApiService: BoardApiService) { }

  getTasks() {
    return this.boardApiService.getTasks()
  }
}
