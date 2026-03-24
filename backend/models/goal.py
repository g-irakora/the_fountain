from app import db
from datetime import datetime

class Goal(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.Enum('education', 'business', 'finance', 'personal', 'health'), default='personal')
    target_date = db.Column(db.Date)
    status = db.Column(db.Enum('active', 'completed', 'paused'), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    milestones = db.relationship('Milestone', backref='goal', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'target_date': self.target_date.isoformat() if self.target_date else None,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'milestones': [m.to_dict() for m in self.milestones]
        }


class Milestone(db.Model):
    __tablename__ = 'milestones'

    id = db.Column(db.Integer, primary_key=True)
    goal_id = db.Column(db.Integer, db.ForeignKey('goals.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    is_completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date)

    def to_dict(self):
        return {
            'id': self.id,
            'goal_id': self.goal_id,
            'title': self.title,
            'description': self.description,
            'is_completed': self.is_completed,
            'due_date': self.due_date.isoformat() if self.due_date else None
        }
