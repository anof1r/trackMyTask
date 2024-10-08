export enum BOARD_SECTIONS {
    todo = 'TODO',
    inProgress = 'IN PROGRESS',
    inReview = 'IN REVIEW',
    done = 'DONE'
}

export interface Section {
    status: BOARD_SECTIONS,
    tasks: Task[]
}

export interface Task {
    name: string,
    status: BOARD_SECTIONS,
    description: string,
    storyCount: number,
    labels: String[]
}