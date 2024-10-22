import { BOARD_SECTIONS, Task } from "../types/types";


export const tasksTodo: Task[] = [
    {id: 1, name: 'Task 1', status: BOARD_SECTIONS.todo, description: 'This is task 1', storyCount: 1, labels: ['critical'] },
    {id: 2, name: 'Task 2', status: BOARD_SECTIONS.todo, description: 'This is task 2', storyCount: 2, labels: ['low'] },
    {id: 3, name: 'Task 3', status: BOARD_SECTIONS.todo, description: 'This is task 3', storyCount: 3, labels: ['critical'] },
    {id: 4, name: 'Task 4', status: BOARD_SECTIONS.todo, description: 'This is task 4', storyCount: 5, labels: ['critical'] },
  ];
  export const tasksInR: Task[] = [
    {id: 5, name: 'Task 1', status: BOARD_SECTIONS.inReview, description: 'This is task 1', storyCount: 1, labels: ['critical'] },
    {id: 6, name: 'Task 3', status: BOARD_SECTIONS.inReview, description: 'This is task 3', storyCount: 3, labels: ['critical'] },
    {id: 7, name: 'Task 4', status: BOARD_SECTIONS.inReview, description: 'This is task 4', storyCount: 5, labels: ['critical'] },
  ];
  export const tasksInP: Task[] = [
    {id: 8, name: 'Task 1', status: BOARD_SECTIONS.inProgress, description: 'This is task 1', storyCount: 1, labels: ['critical'] },
    {id: 9, name: 'Task 4', status: BOARD_SECTIONS.inProgress, description: 'This is task 4', storyCount: 5, labels: ['critical'] },
  ];
  export const tasksDone: Task[] = [
    {id: 10, name: 'Task 1 todo', status: BOARD_SECTIONS.done, description: 'This is task 1', storyCount: 1, labels: ['critical'] },
  ];

  export const sections = [
    { status: BOARD_SECTIONS.todo, tasks: tasksTodo },
    { status: BOARD_SECTIONS.inProgress, tasks: tasksInP },
    { status: BOARD_SECTIONS.inReview, tasks: tasksInR },
    { status: BOARD_SECTIONS.done, tasks: tasksDone },
];