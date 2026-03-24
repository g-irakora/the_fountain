from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.goal import Goal, Milestone

goals_bp = Blueprint('goals', __name__)

@goals_bp.route('/', methods=['GET'])
@jwt_required()
def get_goals():
    user_id = get_jwt_identity()
    goals = Goal.query.filter_by(user_id=user_id).all()
    return jsonify([g.to_dict() for g in goals]), 200

@goals_bp.route('/', methods=['POST'])
@jwt_required()
def create_goal():
    user_id = get_jwt_identity()
    data = request.get_json()
    goal = Goal(user_id=user_id, title=data['title'], description=data.get('description'),
                category=data.get('category', 'personal'), target_date=data.get('target_date'))
    db.session.add(goal)
    db.session.commit()
    return jsonify(goal.to_dict()), 201

@goals_bp.route('/<int:goal_id>', methods=['PUT'])
@jwt_required()
def update_goal(goal_id):
    user_id = get_jwt_identity()
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first_or_404()
    data = request.get_json()
    for field in ['title', 'description', 'category', 'target_date', 'status']:
        if field in data:
            setattr(goal, field, data[field])
    db.session.commit()
    return jsonify(goal.to_dict()), 200

@goals_bp.route('/<int:goal_id>', methods=['DELETE'])
@jwt_required()
def delete_goal(goal_id):
    user_id = get_jwt_identity()
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first_or_404()
    db.session.delete(goal)
    db.session.commit()
    return jsonify({'message': 'Goal deleted'}), 200

@goals_bp.route('/<int:goal_id>/milestones', methods=['POST'])
@jwt_required()
def add_milestone(goal_id):
    data = request.get_json()
    milestone = Milestone(goal_id=goal_id, title=data['title'],
                          description=data.get('description'), due_date=data.get('due_date'))
    db.session.add(milestone)
    db.session.commit()
    return jsonify(milestone.to_dict()), 201

@goals_bp.route('/<int:goal_id>/milestones/<int:mid>', methods=['PUT'])
@jwt_required()
def update_milestone(goal_id, mid):
    milestone = Milestone.query.filter_by(id=mid, goal_id=goal_id).first_or_404()
    data = request.get_json()
    if 'is_completed' in data:
        milestone.is_completed = data['is_completed']
    db.session.commit()
    return jsonify(milestone.to_dict()), 200
