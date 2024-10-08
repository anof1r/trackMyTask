import { BOARD_SECTIONS } from "../types/types";


export const sections = [
    { status: BOARD_SECTIONS.todo, tasks: ['TODO 1', 'TODO 2'] },
    { status: BOARD_SECTIONS.inProgress, tasks: ['inProgress 3'] },
    { status: BOARD_SECTIONS.inReview, tasks: ['inReview 4'] },
    { status: BOARD_SECTIONS.done, tasks: ['done 5'] },
];
