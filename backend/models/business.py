from app import db
from datetime import datetime

class BusinessPlan(db.Model):
    __tablename__ = 'business_plans'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    industry = db.Column(db.String(100))
    target_market = db.Column(db.Text)
    revenue_model = db.Column(db.Text)
    status = db.Column(db.Enum('draft', 'active', 'completed'), default='draft')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    financials = db.relationship('FinancialRecord', backref='business_plan', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        income = sum(f.amount for f in self.financials if f.type == 'income')
        expenses = sum(f.amount for f in self.financials if f.type == 'expense')
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_name': self.business_name,
            'description': self.description,
            'industry': self.industry,
            'target_market': self.target_market,
            'revenue_model': self.revenue_model,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'total_income': income,
            'total_expenses': expenses,
            'profit': income - expenses,
            'financials': [f.to_dict() for f in self.financials]
        }


class FinancialRecord(db.Model):
    __tablename__ = 'financial_records'

    id = db.Column(db.Integer, primary_key=True)
    business_plan_id = db.Column(db.Integer, db.ForeignKey('business_plans.id'), nullable=False)
    type = db.Column(db.Enum('income', 'expense'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100))
    description = db.Column(db.String(255))
    date = db.Column(db.Date, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'business_plan_id': self.business_plan_id,
            'type': self.type,
            'amount': self.amount,
            'category': self.category,
            'description': self.description,
            'date': self.date.isoformat() if self.date else None
        }
