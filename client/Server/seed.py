# # seed.py

# from random import choice as rc, randrange

# from app import app
# from models import db, Game, Score, Review, User

# if __name__ == '__main__':
#     with app.app_context():
        
#         print("🗑 Clearing db...")
#         Game.query.delete()
#         User.query.delete()
#         Score.query.delete()
#         Review.query.delete()

#         print("🔮 Seeding games...")

#         games = [Game(title="Bejeweled"),]


#         db.session.add_all(games)

#         print("🤓 Seeding users..")

#         users = [User(username="HQ", password="bcrypt"),]




#         db.session.add_all(users)

#         print("📚 Seeding Score...")

#         scores = []
#         for game in games:
#             user = rc(users)
#             scores.append(Score(game=game, user=user, scores=scores))
#         db.session.add_all(scores)
#         db.session.commit()

#         print("📚 Seeding Reviews...")


#         reviews = []
#         for review in reviews:
#             user = rc(users)
#             reviews.append(Review(game=game, user=user, review=review))
#         db.session.add_all(reviews)
#         db.session.commit()

#         print("⚡️ Done seeding!")

from random import choice as rc, randrange
# from werkzeug.security import generate_password_hash
from app import app
from models import db, Game, Score, Review, User

if __name__ == '__main__':
    with app.app_context():

        print("🗑 Clearing db...")
        Game.query.delete()
        User.query.delete()
        Score.query.delete()
        Review.query.delete()

        print("🔮 Seeding games...")

        games = [Game(title="Bejeweled")]

        db.session.add_all(games)

        print("🤓 Seeding users...")

        users = [User(first_name="Harry", last_name="Quam", email="hq@gmail", username="HQ", password="bcrypt")]
        
        db.session.add_all(users)

        print("📚 Seeding scores...")

        scores = []
        for game in games:
            user = rc(users)
            scores.append(Score(game=game, user=user, score_value=randrange(0, 101)))
        db.session.add_all(scores)
        db.session.commit()

        print("📚 Seeding reviews...")

        reviews = []
        for game in games:
            user = rc(users)
            reviews.append(Review(game=game, user=user, text="Sample review"))
        db.session.add_all(reviews)
        db.session.commit()

        print("⚡️ Done seeding!")
