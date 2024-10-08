export enum BOARD_SECTIONS {
    todo = 'TODO',
    inProgress = 'IN PROGRESS',
    inReview = 'IN REVIEW',
    done = 'DONE'
}

export interface Section {
    status: BOARD_SECTIONS,
    tasks: String[]
}