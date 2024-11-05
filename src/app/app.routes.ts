import { Routes } from '@angular/router';
import { BoardComponent } from './features/board/board.component';
import { TasksPageComponent } from './features/tasks-page/tasks-page.component';

export const routes: Routes = [
  

      { path: 'board', component: BoardComponent },
      { path: 'tasks', component: TasksPageComponent },
      // { path: 'team', component: TeamComponent },
      { path: '', redirectTo: 'board', pathMatch: 'full' }
    
  
];
