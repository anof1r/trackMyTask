import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, delay } from 'rxjs';
import { MockDataService } from './mock-data.service';
import { environment } from '../../environments/environment';

export const mockDataInterceptor: HttpInterceptorFn = (req, next) => {
  // Only use mock data in development mode
  if (!environment.useMockData) {
    return next(req);
  }

  const mockDataService = inject(MockDataService);
  
  // Simulate network delay
  const simulateDelay = (data: any) => of(new HttpResponse({ 
    status: 200, 
    body: data 
  })).pipe(delay(300));

  const url = req.url;

  // GET /tasks/:projectId - Get all tasks
  if (req.method === 'GET' && url.includes('/tasks/')) {
    const tasks = mockDataService.getTasks();
    return simulateDelay(tasks);
  }

  // POST /tasks - Create new task
  if (req.method === 'POST' && url.endsWith('/tasks')) {
    const task = mockDataService.createTask(req.body as any);
    return simulateDelay(task);
  }

  // PATCH /tasks/:id - Update task status
  if (req.method === 'PATCH' && url.includes('/tasks/')) {
    const id = url.split('/tasks/')[1];
    const status = (req.body as any).status;
    const task = mockDataService.updateTaskStatus(id, status);
    return simulateDelay(task);
  }

  // POST /tasks/:id - Update task content
  if (req.method === 'POST' && url.includes('/tasks/') && !url.endsWith('/tasks')) {
    const id = url.split('/tasks/')[1];
    const updatedTask = (req.body as any).updatedTask;
    const task = mockDataService.updateTaskContent(id, updatedTask);
    return simulateDelay(task);
  }

  // GET /users/ - Get all users
  if (req.method === 'GET' && url.includes('/users/') && url.endsWith('/')) {
    const users = mockDataService.getUsers();
    return simulateDelay(users);
  }

  // GET /users/:id - Get user by ID
  if (req.method === 'GET' && url.includes('/users/') && !url.endsWith('/')) {
    const id = url.split('/users/')[1];
    const user = mockDataService.getUserById(id);
    return simulateDelay(user);
  }

  // GET /task/:userId - Get user's current task
  if (req.method === 'GET' && url.includes('/task/')) {
    const userId = url.split('/task/')[1];
    const taskId = mockDataService.getUserCurrentTask(userId);
    const task = taskId ? mockDataService.getTaskById(taskId) : null;
    return simulateDelay(task);
  }

  // POST /task/:taskId - Assign task to user
  if (req.method === 'POST' && url.includes('/task/')) {
    const taskId = url.split('/task/')[1];
    const userId = (req.body as any).userId;
    mockDataService.assignToUser(taskId, userId);
    return simulateDelay({ success: true });
  }

  // If no mock route matches, pass through to real backend
  return next(req);
};
