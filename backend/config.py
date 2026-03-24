import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'fountain-secret-key-2024')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'mysql+pymysql://root:@localhost/fountain_db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'fountain-jwt-secret-2024')
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours
