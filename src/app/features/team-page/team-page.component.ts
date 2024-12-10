import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Card, CardModule } from 'primeng/card';
import { BehaviorSubject, Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { TeamPageServiceService } from './team-page-service.service';
import { AssignTaskModalComponent } from './create-task-modal/assign-task-modal.component';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [NgFor, CardModule, AsyncPipe, NgIf, AssignTaskModalComponent, NgClass],
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPageComponent implements OnInit {

  protected usersSubject = new BehaviorSubject<any[]>([]);
  protected users$ = this.usersSubject.asObservable();
  protected usersWithTasks$: Observable<any[]> = new Observable<any[]>();
  protected currentUserId: string | null = null;

  protected isCreateTaskModalOpen = false;

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

  openModal(userId: string): void {
    this.currentUserId = userId;
    this.isCreateTaskModalOpen = true;
  }
  
  onTaskSelected(task: any): void {
    if (this.currentUserId) {
        this.uiService.assignToUser(task.taskId, this.currentUserId).subscribe(() => {
        this.getUsers();
      });
    }
  }
  

  closeCreateTaskModal(): void {
    this.isCreateTaskModalOpen = false;
  }

  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      'TODO': 'schedule',
      'In Progress': 'autorenew',
      'In Review': 'visibility',
      'Done': 'check_circle',
    };
    return statusIcons[status] || 'help';
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'TODO': 'todo',
      'In Progress': 'in-progress',
      'In Review': 'in-review',
      'Done': 'done',
    };
    return statusMap[status] || '';
  }
  
}
