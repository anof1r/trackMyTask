const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

const generateTaskId = () => {
    return 'tMt_' + Math.random().toString(36).substring(2, 9);
}

// TODO: Statuses are in different cases (Lower, Upper) need to fix
const tasksArray = [
    { id: generateTaskId(), name: 'Implement CI/CD', status: "TODO", description: 'This task is about configuring GitHub Actions to automate the build, test and deployment process of the application', storyCount: 1, labels: ['critical', 'low'] },
    { id: generateTaskId(), name: 'Develop backend', status: "IN REVIEW", description: 'This task is about writing the server side code for the application. The server should be able to handle requests from the frontend, store data in a database and return the requested data to the frontend', storyCount: 3, labels: ['normal', 'critical'] },
    { id: generateTaskId(), name: 'Create UI', status: "IN REVIEW", description: 'This task is about creating the user interface for the application. The UI should be easy to use and intuitive', storyCount: 3, labels: ['critical'] },
    { id: generateTaskId(), name: 'Create API', status: "TODO", description: 'This task is about creating the API for the application. The API should be able to handle requests from the frontend and return the requested data', storyCount: 1, labels: ['low', 'critical', 'normal'] },
    { id: generateTaskId(), name: 'Test Frontend', status: "DONE", description: 'This task is about writing unit tests and integration tests for the frontend of the application', storyCount: 2, labels: ['low'] },
    { id: generateTaskId(), name: 'Write documentation', status: "IN PROGRESS", description: 'This task is about writing documentation for the application. The documentation should include information about how to use the application, how to run the application and how to contribute to the application', storyCount: 2, labels: ['normal'] },
    { id: generateTaskId(), name: 'Write unit tests', status: "IN PROGRESS", description: 'This task is about writing unit tests for the backend of the application. The unit tests should cover all the functions and classes in the backend', storyCount: 2, labels: ['critical'] },
    { id: generateTaskId(), name: 'Test backend', status: "IN PROGRESS", description: 'This task is about writing integration tests for the backend of the application. The integration tests should cover all the endpoints and functions in the backend', storyCount: 2, labels: ['critical'] },
    { id: generateTaskId(), name: 'Implement security', status: "IN PROGRESS", description: 'This task is about implementing security measures for the application. The security measures should include authentication and authorization', storyCount: 2, labels: ['critical'] },
    { id: generateTaskId(), name: 'Deploy to production', status: "IN PROGRESS", description: 'This task is about deploying the application to a production environment', storyCount: 2, labels: ['critical'] },
    { id: generateTaskId(), name: 'Implement caching', status: "IN PROGRESS", description: 'This task is about implementing caching for the application. The caching should be done using Redis', storyCount: 2, labels: ['normal'] },
    { id: generateTaskId(), name: 'Implement authorization', status: "IN PROGRESS", description: 'This task is about implementing authorization for the application. The authorization should be done using roles', storyCount: 2, labels: ['low'] },
    { id: generateTaskId(), name: 'Implement authentication', status: "IN PROGRESS", description: 'This task is about implementing authentication for the application. The authentication should be done using a token', storyCount: 2, labels: ['low'] },
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

    const updatedArray = updateTaskStatus(taskId, newStatus);

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
