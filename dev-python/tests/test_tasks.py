import unittest
from app import app, db
from models import Task 
from flask_jwt_extended import create_access_token

class TasksTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        self.ctx = app.app_context()
        self.ctx.push()
        db.create_all()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.ctx.pop()
    
    def test_create_task(self):
        access_token = create_access_token(identity='admin')
        response = self.app.post('/tasks', json= {
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2025-12-31 23:59:59',
            'status': 'pending'
        }, headers={'Authorization': f'Bearer {access_token}'})

        self.assertEqual(response.status_code, 201)
        # self.assertEqual(Task.query.count(), 1)
    
    def test_create_task_invalid_date(self):
        access_token = create_access_token(identity='admin')
        response = self.app.post('/tasks', json= {
            'title': 'Test Task',
            'description': 'This is a test task',
            'due_date': '2021-12-31 23:59:59',
            'status': 'pending'
        }, headers={'Authorization': f'Bearer {access_token}'})

        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()