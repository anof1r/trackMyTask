import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamPageServiceService {

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

  getUserCurrentTask(userId: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'task/' + userId).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Failed to fetch user'));
      })
    );
  }
}
