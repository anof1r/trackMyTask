import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskMenuApiServiceService {
  private readonly baseUrl: string

  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/'
  }

  getUserByID(id: string): Observable<any> {    
    return this.httpClient.get(this.baseUrl + 'users/' + id).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Failed to fetch user'));
      })
    );
  }
}
