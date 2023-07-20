#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, Game, User, Review, Score

app = Flask(__name__)
app.secret_key = b'\xfa\xc4\x0b\x93,;\xdb\xc1H/#{\x829n\xd1'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///games.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

CORS(app)

api = Api(app)

class Games(Resource):

    def get(self):
        games = Game.query.all()
        response_body = []
        for game in games:
            response_body.append(game.to_dict())
        return make_response(jsonify(response_body), 200)
    
api.add_resource(Games, '/games')


class GameById(Resource):

    def get(self, id):
        game = Game.query.filter(Game.id == id).first()

        if not game:
            response_body = {"error": "Game not found"}
            status = 404

        else:
            response_body = game.to_dict()
            user_list = []
            for user in list(set(game.users)):
                user_list.append({
                    "id": user.id,
                    "user_name": user.user_name
                })
            response_body.update({"users": user_list})
            status = 200

        return make_response(jsonify(response_body), status)

    def patch(self, id):
        game = Game.query.filter(Game.id == id).first()
        if not game:
            response_body = {"error": "Game not found"}
            return make_response(jsonify(response_body), 404)
        else:
            try:
                json_data = request.get_json()
                for key in json_data:
                    setattr(game, key, json_data.get(key))
                db.session.commit()
                response_body = game.to_dict()
                return make_response(jsonify(response_body), 200)
            except ValueError as error:
                response_body = {"error": error.args}
                return make_response(jsonify(response_body), 422)

api.add_resource(GameById, '/game/<int:id>')


class Users(Resource):

    def get(self):
        # Retrieve all users from the database
        users = User.query.all()
        response_body = [user.to_dict() for user in users]
        return make_response(jsonify(response_body), 200)

    def post(self):
        # Create a new user based on the request data
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        email = data.get('email')
        new_user = User(first_name=firstName, last_name=lastName, email=email, username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user.to_dict()), 201)

api.add_resource(Users, '/users')

        # FULL CRUD
        # password protection goes in post bcrypt
        # post request to /Users



class UserById(Resource):

    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            response_body = {"error": "User not found"}
            status = 404
        else:
            response_body = user.to_dict()
            status = 200
        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            response_body = {"error": "User not found"}
            return make_response(jsonify(response_body), 404)
        else:
            try:
                json_data = request.get_json()
                for key in json_data:
                    setattr(user, key, json_data.get(key))
                db.session.commit()
                response_body = user.to_dict()
                return make_response(jsonify(response_body), 200)
            except ValueError as error:
                response_body = {"error": error.args}
                return make_response(jsonify(response_body), 422)
    
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            response_body = {"error": "User not found"}
            status = 404
        else:
            db.session.delete(user)
            db.session.commit()
            response_body = {}
            status = 204
        return make_response(jsonify(response_body), status)

api.add_resource(UserById, '/user/<int:id>')



class Reviews(Resource):

    def get(self):
        reviews = Review.query.all()
        response_body = []
        for review in reviews:
            response_body.append(review.to_dict())
        return make_response(jsonify(response_body), 200)
    
    def post(self):
        json_data = request.get_json()
        new_review = Review(game_id=json_data.get('game_id'), user_id=json_data.get('user_id'), review=json_data.get('review'))
        db.session.add(new_review)
        db.session.commit()
        response_body = new_review.to_dict()
        return make_response(jsonify(response_body), 201)
    
api.add_resource(Reviews, '/reviews')


class ReviewById(Resource):


    def get(self, id):
        review = Review.query.filter(Review.id == id).first()
        if not review:
            response_body = {"error": "Review not found"}
            status = 404
        else:
            response_body = review.to_dict()
            status = 200
        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        review = Review.query.filter(Review.id == id).first()
        if not review:
            response_body = {"error": "Review not found"}
            status = 404
        else:
            json_data = request.get_json()
            for key in json_data:
                setattr(review, key, json_data.get(key))
            db.session.commit()
            response_body = review.to_dict()
            status = 200
        return make_response(jsonify(response_body), status)
    
    def delete(self, id):
        review = Review.query.filter(Review.id == id).first()
        if not review:
            response_body = {"error": "Review not found"}
            status = 404
        else: 
            db.session.delete(review)
            db.session.commit()
            response_body = {}
            status = 204
        return make_response(jsonify(response_body), status)

api.add_resource(ReviewById, '/review/<int:id>')


class Score(Resource):
    def get(self):
        scores = Score.query.all()
        response_body = []
        for score in scores:
            response_body.append(score.to_dict())
        return make_response(jsonify(response_body), 200)
    
    def post(self):
        json_data = request.get_json()
        print(type(json_data.get('game_id')))
        game = Game.query.filter(Game.id == json_data.get('game_id')).first()
        user = User.query.filter(User.username == json_data.get('username')).first()
        score_value = json_data.get('score')
        #new_score = Score(user=user,game=game,score_value=10)
        print(game.title)
        print(user)
        print(score_value)
        new_score = Score()
        new_score.user = user
        new_score.game = game
        new_score.score_value = score_value
        #new_score = Score(game_id=json_data.get('game_id'), user_id=json_data.get('user_id'), score_value=json_data.get('score'))
        db.session.add_all([new_score])
        db.session.commit()
        response_body = new_score.to_dict()
        return make_response(jsonify(response_body), 201)
    
    def patch(self, score_id):
        json_data = request.get_json()
        score = Score.query.get(score_id)
        if not score:
            response_body = {"error": "Score not found"}
            status = 404
        else:
            score.game_id = json_data.get('game_id') or score.game_id
            score.user_id = json_data.get('user_id') or score.user_id
            score.review = json_data.get('review') or score.review
            db.session.commit()
            response_body = score.to_dict()
            status = 200
        return make_response(jsonify(response_body), status)

    
api.add_resource(Score, '/scores')

class ScoreById(Resource):
    def get(self, id):
        score = Score.query.filter(Score.id == id).first()
        if not score:
            response_body = {"error": "Score not found"}
            status = 404
        else:
            response_body = score.to_dict()
            status = 200
        return make_response(jsonify(response_body), status)
    
    def patch(self, id):
        json_data = request.json
        score = Score.query.filter(Score.id == id).first()
        if not score:
            response_body = {"error": "Score not found"}
            status = 404
        else:
            score.value = json_data.get("value") 

            # Update the user scores in the database
            user = User.query.filter(User.id == score.user_id).first()
            if user:
                user.scores.append(score)
                db.session.commit()

            response_body = score.to_dict()
            status = 200
        return make_response(jsonify(response_body), status)




api.add_resource(ScoreById, "/scores/<int:id>")

class LogIn(Resource):


    def post(self):
        json_data = request.json
        user = User.query.filter(User.username == json_data.get("username")).first()
        if user and (user.password == json_data.get("password")):
            session["user_id"] = user.id
            response_body = user.to_dict()
            response_body['username'] = user.username  # Include username field in response
            return make_response(jsonify(response_body), 201)
        else:
            response_body = {
                "error": "Invalid Username or Password"
            }
            return make_response(jsonify(response_body), 401)
    

api.add_resource(LogIn, "/login")

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session["user_id"]).first()
        if user:
            response_body = user.to_dict()
            return make_response(jsonify(response_body), 200)
        else:
            response_body = {
                "error": "Please Login"
            }
            return make_response(jsonify(response_body), 401)
        
api.add_resource(CheckSession, "/check_session")

class LogOut(Resource):
    def delete(self):
        session["user_id"] = None
        return make_response(jsonify({}), 204)
    
api.add_resource(LogOut, "/logout")




if __name__ == '__main__':
    app.run(port=7000, debug=True)
