const express = require('express')
const app = express()
const port = 3000

const tasksArray = [
    {id: 1, name: 'Task 1', status: "TODO", description: 'This is task 1', storyCount: 1, labels: ['critical'] },
    {id: 3, name: 'Task 3', status: "IN REVIEW", description: 'This is task 3', storyCount: 3, labels: ['critical'] },
    {id: 6, name: 'Task 3', status: "IN REVIEW", description: 'This is task 3', storyCount: 3, labels: ['critical'] },
    {id: 8, name: 'Task 1', status: "TODO", description: 'This is task 1', storyCount: 1, labels: ['critical'] },
    {id: 2, name: 'Task 2', status: "DONE", description: 'This is task 2', storyCount: 2, labels: ['low'] },
    {id: 2, name: 'Task 2', status: "IN PROGRESS", description: 'This is task 2', storyCount: 2, labels: ['low'] },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tasks', (req,res) => {
    res.statusCode = 200
    res.send(tasksArray)
})

app.patch('/taks/:taskId', (req,res) => {
        res.send(req.params)
    })
    //patch na change statusa
    //post na create new task
    //delete ponytno i tak

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})