import { Routes } from '@angular/router';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { BoardComponent } from './features/board/board.component';
import { TasksComponent } from './features/tasks/tasks.component';

export const routes: Routes = [
  

      { path: 'board', component: BoardComponent },
      { path: 'tasks', component: TasksComponent },
      // { path: 'team', component: TeamComponent },
      { path: '', redirectTo: 'board', pathMatch: 'full' }
    
  
];
