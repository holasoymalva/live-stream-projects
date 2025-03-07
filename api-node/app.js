 const express = require('express')
 const app = express();
 const port = 8000;

class Tarea{
    constructor(id, titulo, descripcion){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

let tareas = [
    new Tarea(1,"terminar la api en Flask in node ", "terminar y publicar api en flask"),
    new Tarea(2,"terminar nuesta api en node.js in node", "Hacer un api y mostrarlo en el live con node js")
]

 app.use(express.json());
 
 app.get('/', (req, res) => {
    res.json({message: "Ella no te ama"})
 })

 // get 
app.get('/tareas', (req, res) => {
    res.json(tareas);
})

// post 
app.post('/tareas', (req, res) => {
    const nuevaTarea = new Tarea(
        req.body.id,
        req.body.titulo,
        req.body.descripcion,
    );
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
})

// put 
app.put('/tareas/:id', (req, res) => {
    const {id} = req.params;
    const { titulo, descripcion} = req.body;

    const tarea = tareas.find(t => t.id == id);

    if (tarea) {
        tarea.titulo = titulo || tarea.titulo;
        tarea.descripcion = descripcion || tarea.descripcion;
        res.json(tarea)
    }else{
        res.status(404).json({error: "Tarea no encontrada" });
    }
});

// put 
app.delete('/tareas/:id', (req, res) => {
    const {id} = req.params;
    const tareasAntes = tareas.length;
    tareas = tareas.filter(t => t.id != id);
    const tareasDespues = tareas.length;

    if (tareasAntes === tareasDespues) {
        res.status(404).json({error: "Tarea no encontrada" });
    }else{
        res.json({resultado: true});
    }
});


app.listen(port, ()=>{
    console.log('Servidor escuchando en el puerto :', port);
 })