from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Tarea(BaseModel):
    id: int
    titulo: str 
    descripcion: str

tareas = [
    Tarea(id=1,titulo="terminar la api en Flask", descripcion="terminar y publicar api en flask"),
    Tarea(id=2,titulo="terminar nuesta api en node.js", descripcion="Hacer un api y mostrarlo en el live con node js")
]

@app.get('/')
def home():
    return {"message":"hola mundo"}

# Get 
@app.get('/tareas')
def obtener_tareas():
    return tareas

# Post 
@app.post('/tareas', response_model=Tarea, status_code=201)
def agregar_tarea(tarea: Tarea):
    tareas.append(tarea)
    return tarea

# Put
@app.put('/tareas/{id}',response_model=Tarea)
def actualizar_tarea(id:int, tarea_nueva: Tarea):
    for tarea in tareas:
        if tarea.id == id:
            tarea.titulo = tarea_nueva.titulo
            tarea.descripcion = tarea_nueva.descripcion
            return tarea
    return HTTPException(status_code=404, detail="Tarea no encontrada")

@app.delete('/tareas/{id}', status_code=200)
def eleminar_tarea(id: int):
    global tareas
    tareas = [ t for t in tareas if t.id != id]
    return {"resultado": True, }

