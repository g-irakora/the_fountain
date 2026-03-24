from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    from routes.auth import auth_bp
    from routes.goals import goals_bp
    from routes.business import business_bp
    from routes.mentorship import mentorship_bp
    from routes.community import community_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(goals_bp, url_prefix='/api/goals')
    app.register_blueprint(business_bp, url_prefix='/api/business')
    app.register_blueprint(mentorship_bp, url_prefix='/api/mentorship')
    app.register_blueprint(community_bp, url_prefix='/api/community')

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
