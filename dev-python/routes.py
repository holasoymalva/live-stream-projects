# routes.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Task
from datetime import datetime

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/')
def index():
    return jsonify(message='Welcome to the Tasks API'), 200

@tasks_bp.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    due_date_str = data.get('due_date')
    status = data.get('status', 'pending')

    if not title or not due_date_str:
        return jsonify(message='Title and due date are required'), 400
    
    try:
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d %H:%M:%S')
        if due_date < datetime.now():
            return jsonify(message='Due date must be in the future'), 400
    except ValueError:
        return jsonify(message='Invalid date format. Please use YYYY-MM-DD'), 400

    task = Task(title=title, description=description, due_date=due_date, status=status)
    db.session.add(task)
    db.session.commit()
    
    return jsonify(task.to_dict()), 201

@tasks_bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks]), 200

@tasks_bp.route('/tasks/<int:task_id>', methods=['GET'])
@jwt_required()
def get_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify(message='Task not found'), 404
    return jsonify(task.to_dict()), 200

@tasks_bp.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify(message='Task not found'), 404

    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    due_date_str = data.get('due_date')
    status = data.get('status')

    try:
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d %H:%M:%S')
        if due_date < datetime.now():
            return jsonify(message='Due date must be in the future'), 400
    except ValueError:
        return jsonify(message='Invalid date format. Please use YYYY-MM-DD'), 400
    
    task.title = title
    task.description = description
    task.due_date = due_date
    task.status = status
    db.session.commit()
    return jsonify(task.to_dict()), 200

@tasks_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify(message='Task deleted'), 200