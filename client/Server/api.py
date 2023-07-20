# from flask import Flask, request, jsonify

# app = Flask(__name__)

# # In-memory storage for simplicity (Replace with a proper database in production)
# users = {}

# # API endpoint to register a new user
# @app.route('/users', methods=['POST'])
# def create_user():
#     data = request.get_json()
#     username = data['username']
#     password = data['password']
    
#     # Check if username already exists
#     if username in users:
#         return jsonify({'message': 'Username already exists'}), 400
    
#     # Store the username and password
#     users[username] = {
#         'password': password,
#         'score': None
#     }
    
#     return jsonify({'message': 'User created successfully'})

# # API endpoint to update the password for a user
# @app.route('/users/<username>', methods=['PATCH'])
# def update_password(username):
#     data = request.get_json()
#     password = data['password']
    
#     # Check if username exists
#     if username in users:
#         users[username]['password'] = password
#         return jsonify({'message': 'Password updated successfully'})
    
#     return jsonify({'message': 'User not found'}), 404

# # API endpoint to update the score for a user
# @app.route('/users/<username>/score', methods=['PATCH'])
# def update_score(username):
#     data = request.get_json()
#     score = data['score']
    
#     # Check if username exists
#     if username in users:
#         users[username]['score'] = score
#         return jsonify({'message': 'Score updated successfully'})
    
#     return jsonify({'message': 'User not found'}), 404

# # API endpoint to delete a user
# @app.route('/users/<username>', methods=['DELETE'])
# def delete_user(username):
#     # Check if username exists
#     if username in users:
#         del users[username]
#         return jsonify({'message': 'User deleted successfully'})
    
#     return jsonify({'message': 'User not found'}), 404

# if __name__ == '__main__':
#     app.run()
