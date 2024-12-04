import { Routes } from '@angular/router';
import { BoardComponent } from './features/board/board.component';
import { TasksPageComponent } from './features/tasks-page/tasks-page.component';
import { TeamPageComponent } from './features/team-page/team-page.component';


export const routes: Routes = [
      { path: '', redirectTo: '/board', pathMatch: 'full' },
      { path: 'board', component: BoardComponent },
      { path: 'tasks', component: TasksPageComponent },
      { path: 'team', component: TeamPageComponent },
];
