from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('youth', 'mentor', 'entrepreneur', 'admin'), default='youth')
    bio = db.Column(db.Text)
    skills = db.Column(db.String(255))
    location = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    goals = db.relationship('Goal', backref='user', lazy=True)
    business_plans = db.relationship('BusinessPlan', backref='user', lazy=True)
    posts = db.relationship('Post', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'bio': self.bio,
            'skills': self.skills,
            'location': self.location,
            'created_at': self.created_at.isoformat()
        }
