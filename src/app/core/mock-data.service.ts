import { Injectable } from '@angular/core';
import { Task, BOARD_SECTIONS } from '../features/types/types';

const MOCK_DATA_KEY = 'trackMyTask_mockData';

export interface MockData {
  tasks: Task[];
  users: any[];
  userTasks: { [userId: string]: string }; // userId -> taskId mapping
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  private defaultMockData: MockData = {
    tasks: [
      {
        id: '1',
        title: 'Настроить CI/CD pipeline',
        status: BOARD_SECTIONS.todo,
        description: 'Настроить автоматический деплой на GitHub Pages',
        story_points: 5,
        labels: ['DevOps', 'Infrastructure'],
        assignedUser: 'user-1'
      },
      {
        id: '2',
        title: 'Добавить темную тему',
        status: BOARD_SECTIONS.inProgress,
        description: 'Реализовать переключатель темной/светлой темы',
        story_points: 3,
        labels: ['UI', 'Enhancement'],
        assignedUser: 'user-2'
      },
      {
        id: '3',
        title: 'Оптимизировать загрузку данных',
        status: BOARD_SECTIONS.inProgress,
        description: 'Добавить ленивую загрузку и кэширование',
        story_points: 8,
        labels: ['Performance', 'Backend'],
        assignedUser: 'user-1'
      },
      {
        id: '4',
        title: 'Написать документацию',
        status: BOARD_SECTIONS.inReview,
        description: 'Создать подробную документацию для API',
        story_points: 5,
        labels: ['Documentation'],
        assignedUser: 'user-3'
      },
      {
        id: '5',
        title: 'Исправить баг с drag-and-drop',
        status: BOARD_SECTIONS.done,
        description: 'Задачи не обновляются корректно при перетаскивании',
        story_points: 2,
        labels: ['Bug', 'UI'],
        assignedUser: 'user-2'
      },
      {
        id: '6',
        title: 'Добавить unit тесты',
        status: BOARD_SECTIONS.todo,
        description: 'Написать тесты для основных компонентов',
        story_points: 8,
        labels: ['Testing', 'Quality'],
        assignedUser: ''
      },
      {
        id: '7',
        title: 'Реализовать поиск по задачам',
        status: BOARD_SECTIONS.todo,
        description: 'Добавить фильтрацию и поиск задач',
        story_points: 5,
        labels: ['Feature', 'UI'],
        assignedUser: ''
      },
      {
        id: '8',
        title: 'Добавить уведомления',
        status: BOARD_SECTIONS.inReview,
        description: 'Push-уведомления о изменениях в задачах',
        story_points: 13,
        labels: ['Feature', 'Backend'],
        assignedUser: 'user-3'
      }
    ],
    users: [
      {
        id: 'user-1',
        name: 'Анна Иванова',
        email: 'anna@example.com',
        role: 'Frontend Developer',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 'user-2',
        name: 'Дмитрий Петров',
        email: 'dmitry@example.com',
        role: 'Backend Developer',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        id: 'user-3',
        name: 'Елена Сидорова',
        email: 'elena@example.com',
        role: 'Tech Lead',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      {
        id: 'user-4',
        name: 'Михаил Козлов',
        email: 'mikhail@example.com',
        role: 'QA Engineer',
        avatar: 'https://i.pravatar.cc/150?img=4'
      }
    ],
    userTasks: {
      'user-1': '1',
      'user-2': '2',
      'user-3': '4'
    }
  };

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const stored = localStorage.getItem(MOCK_DATA_KEY);
    if (!stored) {
      this.saveMockData(this.defaultMockData);
    }
  }

  getMockData(): MockData {
    const stored = localStorage.getItem(MOCK_DATA_KEY);
    return stored ? JSON.parse(stored) : this.defaultMockData;
  }

  saveMockData(data: MockData): void {
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(data));
  }

  // Task operations
  getTasks(projectId?: string): Task[] {
    return this.getMockData().tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.getMockData().tasks.find(task => task.id === id);
  }

  createTask(task: Task): Task {
    const data = this.getMockData();
    const newTask = {
      ...task,
      id: this.generateId()
    };
    data.tasks.push(newTask);
    this.saveMockData(data);
    return newTask;
  }

  updateTaskStatus(id: string, status: string): Task | null {
    const data = this.getMockData();
    const task = data.tasks.find(t => t.id === id);
    if (task) {
      task.status = status as BOARD_SECTIONS;
      this.saveMockData(data);
      return task;
    }
    return null;
  }

  updateTaskContent(id: string, updatedTask: string): Task | null {
    const data = this.getMockData();
    const task = data.tasks.find(t => t.id === id);
    if (task) {
      // Assuming updatedTask is JSON string with task properties
      try {
        const updates = JSON.parse(updatedTask);
        Object.assign(task, updates);
        this.saveMockData(data);
        return task;
      } catch (e) {
        console.error('Error parsing task update:', e);
      }
    }
    return null;
  }

  // User operations
  getUsers(): any[] {
    return this.getMockData().users;
  }

  getUserById(id: string): any | undefined {
    return this.getMockData().users.find(user => user.id === id);
  }

  getUserCurrentTask(userId: string): string | null {
    const data = this.getMockData();
    return data.userTasks[userId] || null;
  }

  assignToUser(taskId: string, userId: string): void {
    const data = this.getMockData();
    // Update task assignment
    const task = data.tasks.find(t => t.id === taskId);
    if (task) {
      task.assignedUser = userId;
    }
    // Update user-task mapping
    data.userTasks[userId] = taskId;
    this.saveMockData(data);
  }

  // Utility method to generate unique IDs
  private generateId(): string {
    return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // Reset to default data (useful for testing)
  resetMockData(): void {
    this.saveMockData(this.defaultMockData);
  }
}
