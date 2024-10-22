const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const tasksArray = [
    { id: 1, name: 'Task 1', status: "TODO", description: 'This is task 1', storyCount: 1, labels: ['critical'] },
    { id: 3, name: 'Task 3', status: "IN REVIEW", description: 'This is task 3', storyCount: 3, labels: ['critical'] },
    { id: 6, name: 'Task 6', status: "IN REVIEW", description: 'This is task 3', storyCount: 3, labels: ['critical'] },
    { id: 8, name: 'Task 8', status: "TODO", description: 'This is task 1', storyCount: 1, labels: ['critical'] },
    { id: 2, name: 'Task 2', status: "DONE", description: 'This is task 2', storyCount: 2, labels: ['low'] },
    { id: 7, name: 'Task 7', status: "IN PROGRESS", description: 'This is task 2', storyCount: 2, labels: ['low'] },
]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/tasks', (req, res) => {
    res.statusCode = 200
    res.send(tasksArray)
})

app.patch('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const newStatus = req.body.status;

    console.log(`Received request to update task with id ${taskId} to status ${newStatus}`);

    const updatedArray = updateTaskStatus(Number(taskId), newStatus);

    if (updatedArray) {
        res.statusCode = 201;
        res.send({ params: req.params, updatedTasks: updatedArray });
    } else {
        res.statusCode = 404;
        res.send({ error: `Task with id ${taskId} not found` });
    }
});

const updateTaskStatus = (taskId, newStatus) => {
    const task = tasksArray.find(task => task.id === taskId);

    if (task) {
        console.log(`Updating task ${taskId} from status ${task.status} to ${newStatus}`);
        task.status = newStatus;

        console.log(`Task ${taskId} successfully updated to ${newStatus}`);
        return tasksArray;
    } else {
        console.log(`Task with id ${taskId} not found`);
        return null;
    }
};

//post na create new task
//delete ponytno i tak

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
