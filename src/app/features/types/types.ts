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
    id: string,
    title: string,
    status: BOARD_SECTIONS,
    description: string,
    story_points: number,
    labels: String[],
    assignedUser: string
}