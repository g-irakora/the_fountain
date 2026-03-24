from app import db
from datetime import datetime

class Mentorship(db.Model):
    __tablename__ = 'mentorships'

    id = db.Column(db.Integer, primary_key=True)
    mentor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    mentee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.Enum('pending', 'active', 'completed', 'declined'), default='pending')
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    mentor = db.relationship('User', foreign_keys=[mentor_id], backref='mentoring')
    mentee = db.relationship('User', foreign_keys=[mentee_id], backref='mentored_by')

    def to_dict(self):
        return {
            'id': self.id,
            'mentor_id': self.mentor_id,
            'mentee_id': self.mentee_id,
            'mentor_name': self.mentor.name if self.mentor else None,
            'mentee_name': self.mentee.name if self.mentee else None,
            'status': self.status,
            'message': self.message,
            'created_at': self.created_at.isoformat()
        }
