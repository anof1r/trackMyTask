import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Card, CardModule } from 'primeng/card';
import { BehaviorSubject, Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { TeamPageServiceService } from './team-page-service.service';
import { BoardApiService } from '../board/board-api.service';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [NgFor, CardModule, AsyncPipe, NgIf],
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPageComponent implements OnInit {
  protected usersSubject = new BehaviorSubject<any[]>([]);
  protected users$ = this.usersSubject.asObservable();
  protected usersWithTasks$: Observable<any[]> = new Observable<any[]>();

  constructor(private uiService: TeamPageServiceService) {
    this.getUsers();
  }

  ngOnInit(): void {
    this.usersWithTasks$ = this.users$.pipe(
      switchMap(users => {
        if (users.length === 0) {
          return [];
        }
        return combineLatest(
          users.map(user => 
            this.uiService.getUserCurrentTask(user.id).pipe(
              map(tasks => ({
                ...user,
                tasks: tasks || []
              }))
            )
          )
        );
      })
    );
  }

  getUsers() {
    this.uiService.getUsers().pipe().subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  getUserTasks(userId: string): Observable<any[]> {
    return this.uiService.getUserCurrentTask(userId).pipe(tap(console.log),
      map(tasks => tasks || [])
    );
  }
}
