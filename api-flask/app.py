from flask import Flask
from flask import jsonify, request

app = Flask(__name__)

class Tarea:
    def __init__(self, id: int, titulo: str, descripcion: str):
        self.id = id;
        self.titulo = titulo;
        self.descripcion = descripcion;

    def a_diccionario(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descripcion": self.descripcion
        }

tareas = [
    Tarea(1,"terminar la api en Flask", "terminar y publicar api en flask"),
    Tarea(2,"terminar nuesta api en node.js", "Hacer un api y mostrarlo en el live con node js")
]

@app.route('/')
def home():
    return "Hola mundi"

@app.route('/tareas' , methods=['GET'])
def obtener_tareas():
    return jsonify([tarea.a_diccionario() for tarea in tareas])

@app.route('/tareas', methods=['POST'])
def agregar_tarea():
    nueva_tarea = Tarea(
        id=request.json['id'],
        titulo=request.json['titulo'],
        descripcion=request.json['descripcion']
    )
    tareas.append(nueva_tarea);
    return jsonify(nueva_tarea.a_diccionario()), 201

@app.route('/tareas/<int:id>', methods=['PUT'])
def actualizar_tarea(id):
    tarea = next(( t for t in tareas if t.id == id), None)
    if tarea is not None: 
        tarea.titulo = request.json.get('titulo', tarea.titulo)
        tarea.descripcion = request.json.get('descripcion', tarea.descripcion)
        return jsonify(tarea.a_diccionario())
    return jsonify({"error":"Tarea no encontrada"}),404

@app.route('/tareas/<int:id>', methods=['DELETE'])
def eleminar_tarea(id):
    global tareas
    tareas = [ t for t in tareas if t.id != id]
    return jsonify({'resultado': True})

@app.errorhandler(404)
def not_found(error):
    return {"error":"Recurso no encontrado"}, 404

if __name__ == '__main__':
    app.run(debug=True)