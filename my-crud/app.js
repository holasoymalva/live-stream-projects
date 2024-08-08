const express = require('express')
const app = express();
const port = 8000;

app.use(express.json());

class Task {
    constructor(id, title, description){
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

let tasks = [
    new Task(1, "TASK 1", "First Task"),
    new Task(2, "TASK 2", "Second Task")
]

app.get('/', (req, res) => {
    res.json({message: "Hola Crayola"});
})

app.get('/tasks', (req, res) =>{
    console.log('res :',res);
    res.json(tasks);
})

app.post('/tasks', (req, res) =>{
    console.log('req :',req);
    const newTask = new Task(
        req.body.id,
        req.body.title,
        req.body.description
    );
    tasks.push(newTask);
    res.status(201).json(newTask);
})

app.put('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    const task = tasks.find(t => t.id == id);

    if(task){
        task.title = title || task.title;
        task.description = description || task.description;
        res.json(task);
    }else{
        res.status(404).json({error: "Task not found"});
    }
})

app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const tasksBefore = tasks.length;
    tasks = tasks.filter(t => t.id != id);
    const tasksAfter = tasks.length;

    if(tasksBefore === tasksAfter){
        res.status(404).json({error: "Task not found"});
    }else{
        res.json({result: true});
    }
})

app.listen(port, ()=>{
    console.log('El servidor esta funcionando:',port);
})