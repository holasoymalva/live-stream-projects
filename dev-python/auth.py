from flask import request, jsonify
from flask_jwt_extended import create_access_token, JWTManager, jwt_required

jwt = JWTManager()

USERS = {
    'admin': 'password123'
}

def authenticate_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if USERS.get(username) == password:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    return jsonify(message='Invalid credentials'), 401
    
@jwt_required()
def protected_route():
    return jsonify(message='You have access to this protected route'), 200