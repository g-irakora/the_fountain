from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.business import BusinessPlan, FinancialRecord

business_bp = Blueprint('business', __name__)

@business_bp.route('/', methods=['GET'])
@jwt_required()
def get_plans():
    user_id = get_jwt_identity()
    plans = BusinessPlan.query.filter_by(user_id=user_id).all()
    return jsonify([p.to_dict() for p in plans]), 200

@business_bp.route('/', methods=['POST'])
@jwt_required()
def create_plan():
    user_id = get_jwt_identity()
    data = request.get_json()
    plan = BusinessPlan(user_id=user_id, business_name=data['business_name'],
                        description=data.get('description'), industry=data.get('industry'),
                        target_market=data.get('target_market'), revenue_model=data.get('revenue_model'))
    db.session.add(plan)
    db.session.commit()
    return jsonify(plan.to_dict()), 201

@business_bp.route('/<int:plan_id>', methods=['PUT'])
@jwt_required()
def update_plan(plan_id):
    user_id = get_jwt_identity()
    plan = BusinessPlan.query.filter_by(id=plan_id, user_id=user_id).first_or_404()
    data = request.get_json()
    for field in ['business_name', 'description', 'industry', 'target_market', 'revenue_model', 'status']:
        if field in data:
            setattr(plan, field, data[field])
    db.session.commit()
    return jsonify(plan.to_dict()), 200

@business_bp.route('/<int:plan_id>/financials', methods=['POST'])
@jwt_required()
def add_financial(plan_id):
    data = request.get_json()
    record = FinancialRecord(business_plan_id=plan_id, type=data['type'],
                             amount=data['amount'], category=data.get('category'),
                             description=data.get('description'), date=data.get('date'))
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201
