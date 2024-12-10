const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000
const pool = require('./db');

app.use(express.json());
app.use(cors());

const prepareTasksToSend = (tasks) => {
    return tasks.map(task => {
        return {
            id: task.id,
            title: task.title,
            status: task.status,
            description: task.description,
            story_points: task.story_points,
            labels: task.priority,
            assignedUser: task.assigned_user_id,
            created_at: task.created_at,
            deadline: task.deadline
        }
    });
}

app.get('/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public."Project"');
        res.json(result.rows);
    } catch (err) {
        console.error('An error occured while fetching data from the database', err.stack);
        res.status(500).send('Server error');
    }
});

app.get('/tasks/:projectId', async (req, res) => {
    console.log('PostgreSQL => GETTING TASKS');
    
    try {
        const result = await pool.query('SELECT * FROM public."Task" WHERE project_id = $1', [req.params.projectId]);
        res.json(prepareTasksToSend(result.rows));
    } catch (err) {
        console.error('An error occured while fetching data from the database:', err.stack);
        res.status(500).send('Server error');
    }
})

app.patch('/tasks/:taskId', async (req, res) => {
    console.log('PostgreSQL => UPDATING TASK STATUS');

    try {
        const result = await pool.query('UPDATE public."Task" SET status = $1 WHERE id = $2', [req.body.status, req.params.taskId]);
        res.json(prepareTasksToSend(result.rows));
    } catch (err) {
        console.error('An error occured while fetching data from the database:', err.stack);
        res.status(500).send('Server error');
    }
})

app.post('/tasks/:taskId', async (req, res) => {
    console.log('PostgreSQL => UPDATING TASK CONTENT');

    try {
        const { title, description, status, story_points, labels } = req.body.updatedTask;
        const result = await pool.query(
            'UPDATE public."Task" SET title = $1, description = $2, status = $3, story_points = $4, priority = $5 WHERE id = $6 RETURNING *',
            [title, description, status, story_points, labels, req.params.taskId]
        );
        res.json(prepareTasksToSend(result.rows));
    } catch (err) {
        console.error('An error occurred while updating the task:', err.stack);
        res.status(500).send('Server error');
    }
});

app.post('/tasks', async (req, res) => {
    console.log('PostgreSQL => CREATING NEW TASK');

    try {
        const { title, description, status, story_points, priority, assigned_user, created_at, deadline } = req.body;
        const result = await pool.query(
            'INSERT INTO public."Task" (project_id, title, description, status, story_points, priority, assigned_user_id, created_at, deadline) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            ['5befb196-dcdc-48dd-98a3-d19fd881e62c',title, description, status, story_points, priority, assigned_user, created_at, deadline]
        );
        res.json(prepareTasksToSend(result.rows));
    } catch (err) {
        console.error('An error occurred while creating the task:', err.stack);
        res.status(500).send('Server error');
    }
});

app.get('/users', async (req, res) => { 
    console.log('PostgreSQL => GETTING USERS LIST');

    try {
        const result = await pool.query('SELECT * FROM public."User"');
        res.json(result.rows);
    } catch (err) {
        console.error('An error occured while fetching data from the database:', err.stack);
        res.status(500).send('Server error');
    }
})

app.get('/users/:userId', async (req, res) => { 
    console.log('PostgreSQL => GETTING USERS LIST');

    try {
        const result = await pool.query('SELECT * FROM public."User" WHERE id = $1', [req.params.userId]);
        res.json(result.rows);
    } catch (err) {
        console.error('An error occured while fetching data from the database:', err.stack);
        res.status(500).send('Server error');
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
