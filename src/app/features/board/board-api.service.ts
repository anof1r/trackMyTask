import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class BoardApiService {

  private readonly baseUrl: string

  constructor(private httpClient: HttpClient ) {
    this.baseUrl = 'http://localhost:3000/'
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl + 'tasks').pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch tasks, please try again later'));
      })
    );
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    return this.httpClient.patch(this.baseUrl + 'tasks/' + id, { status }).pipe(
      catchError(error => {
        console.error('Error updating task:', error);
        return throwError(() => new Error('Failed to update task status'));
      })
    );
  }
}
