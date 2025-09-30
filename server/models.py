from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)

    books = db.relationship("Book", backref="user", lazy=True)
    reviews = db.relationship("Review", backref="user", lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self, include_relationships=False):
        data = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }
        if include_relationships:
            data["books"] = [book.to_dict() for book in self.books]
            data["reviews"] = [review.to_dict() for review in self.reviews]
        return data


class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    year_published = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    reviews = db.relationship("Review", backref="book", lazy=True)

    def to_dict(self, include_relationships=False):
        data = {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "year_published": self.year_published,
            "description": self.description,
            "user_id": self.user_id,
            "user": self.user.to_dict() if self.user else None,
        }
        if include_relationships:
            data["reviews"] = [review.to_dict() for review in self.reviews]
        return data


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)  # 1–5
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)

    def to_dict(self, include_relationships=True):
        data = {
            "id": self.id,
            "rating": self.rating,
            "comment": self.comment,
            "user_id": self.user_id,
            "book_id": self.book_id,
        }
        if include_relationships:
            data["user"] = self.user.to_dict() if self.user else None
            data["book"] = {
                "id": self.book.id,
                "title": self.book.title
            } if self.book else None
        return data
