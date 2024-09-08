# app.py
from flask import Flask
from models import db
from auth import jwt, authenticate_user 
from routes import tasks_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)

# Congifurations
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['JWT_SECRET_KEY'] = 'super-secret'
db.init_app(app)
jwt.init_app(app)

# Routes
app.register_blueprint(tasks_bp, url_prefix='/api')
app.add_url_rule('/login', 'login', authenticate_user, methods=['POST'])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)