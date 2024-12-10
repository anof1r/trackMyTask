import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignTaskModalUiServieService {

  protected baseUrl: string = 'http://localhost:3000/'

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {    
    return this.httpClient.get(this.baseUrl + 'users/').pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Failed to fetch user'));
      })
    );
  }

  getTasks(): Observable<any> {    
    return this.httpClient.get(this.baseUrl + 'tasks/5befb196-dcdc-48dd-98a3-d19fd881e62c').pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError(() => new Error('Failed to fetch user'));
      })
    );
  }

}
