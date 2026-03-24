from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.community import Post, Comment

community_bp = Blueprint('community', __name__)

@community_bp.route('/posts', methods=['GET'])
@jwt_required()
def get_posts():
    category = request.args.get('category')
    query = Post.query
    if category:
        query = query.filter_by(category=category)
    posts = query.order_by(Post.created_at.desc()).all()
    return jsonify([p.to_dict() for p in posts]), 200

@community_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    data = request.get_json()
    post = Post(user_id=user_id, content=data['content'],
                category=data.get('category', 'tip'))
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

@community_bp.route('/posts/<int:post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    post = Post.query.get_or_404(post_id)
    post.likes += 1
    db.session.commit()
    return jsonify({'likes': post.likes}), 200

@community_bp.route('/posts/<int:post_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(post_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    comment = Comment(post_id=post_id, user_id=user_id, content=data['content'])
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201
