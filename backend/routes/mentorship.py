from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.user import User
from models.mentorship import Mentorship

mentorship_bp = Blueprint('mentorship', __name__)

@mentorship_bp.route('/mentors', methods=['GET'])
@jwt_required()
def get_mentors():
    mentors = User.query.filter_by(role='mentor').all()
    return jsonify([m.to_dict() for m in mentors]), 200

@mentorship_bp.route('/request', methods=['POST'])
@jwt_required()
def request_mentorship():
    user_id = get_jwt_identity()
    data = request.get_json()
    mentorship = Mentorship(mentor_id=data['mentor_id'], mentee_id=user_id,
                            message=data.get('message', ''))
    db.session.add(mentorship)
    db.session.commit()
    return jsonify(mentorship.to_dict()), 201

@mentorship_bp.route('/requests', methods=['GET'])
@jwt_required()
def get_requests():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role == 'mentor':
        requests = Mentorship.query.filter_by(mentor_id=user_id).all()
    else:
        requests = Mentorship.query.filter_by(mentee_id=user_id).all()
    return jsonify([r.to_dict() for r in requests]), 200

@mentorship_bp.route('/<int:mid>/respond', methods=['PUT'])
@jwt_required()
def respond(mid):
    data = request.get_json()
    mentorship = Mentorship.query.get_or_404(mid)
    mentorship.status = data['status']
    db.session.commit()
    return jsonify(mentorship.to_dict()), 200
