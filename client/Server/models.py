
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData 
from sqlalchemy.orm import validates, relationship, declarative_base
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
Base = declarative_base()

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    # Add relationship
    scores = db.relationship('Score', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')

    # Add serialization
    serialize_rules = ("-scores", "-reviews")

    #Add validation
    @validates("username")
    def validate_user(self, key, value):
        if not value:
            raise ValueError(f"Invalid username.")
        return value
    
    
    def __repr__(self):
        return f'<User {self.id}>'
    


class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    highest_score = db.Column(db.Integer)

    # Add relationship
    scores = db.relationship('Score', back_populates='game')
    reviews = db.relationship('Review', back_populates='game')

    # Add serialization
    serialize_rules = ("-scores", "-reviews")

    def __repr__(self):
        return f'<Game {self.id}>'
    


class Score(db.Model, SerializerMixin):
    __tablename__ = 'scores'

    id = db.Column(db.Integer, primary_key=True)
    score_value = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    
    # Add relationships
    game = db.relationship('Game', back_populates='scores')
    user = db.relationship('User', back_populates='scores')

    # Add serialization
    serialize_rules = ("-game", "-user")

    # Add validation
    # @validates('score_value')
    # def validate_score(self, key, value):
    #     if value <= 99:
    #         raise ValueError(f"Score must be less than or equal to 100")
    #     return value

    
    def __repr__(self):
        return f'<Score {self.id}>'
    

    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"))


    # Add relationships
    game = db.relationship('Game', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    # Add serialization
    serialize_rules = ("-game", "-user")

    # Add validation
    @validates("text")
    def validate_review(self, key, value):
        if not value :
            raise ValueError(f"Text")
        return value
    
    def __repr__(self):
        return f'<Review {self.id}>'