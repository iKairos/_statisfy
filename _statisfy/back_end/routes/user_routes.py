from __main__ import app
from audioop import cross 
from flask import request
from random import randint
from objects.user import User
from flask_cors import cross_origin
import bcrypt

@app.route("/api/user/fetch/<id>")
@cross_origin()
def fetch_user(id):
    user = User(id)
    
    if not user.is_registered:
        return {
            'error': 'User does not exist.',
            'code': 'USER_NOT_EXIST'
        }

    return {
            'user': {
                '_id': id,
                'first_name': user.first_name,
                'middle_name': user.middle_name,
                'last_name': user.last_name,
                'username': user.username,
                'email_address': user.email_address,
                'nickname': user.nickname,
                'educ_level': user.educ_level,
                'major': user.major,
                'occupation': user.occupation,
                'profile_picture': user.profile_picture,
                'researches': user.research_papers,
                'created_at': user.created_at
            },
            'code': 'USER_FETCH_SUCCESS'
        }

@app.route("/api/user/new", methods = ['POST'])
@cross_origin()
def register_user():
    if request.method == 'POST':
        try:
            data = request.get_json()

            if not User.check_availability("uname", data['username']):
                return {
                    'message': "Username already exists.",
                    'code': "REGISTER_USERNAME_EXISTS",
                    'type': 'warning'
                }
            
            if not User.check_availability("email", data['email_address']):
                return {
                    'message': "Email Address is already registered.",
                    'code': "REGISTER_EMAIL_EXISTS",
                    'type': 'warning'
                }
            
            
            uuid = randint(10000000, 99999999)
            
            user = User(uuid)
            
            while user.is_registered:
                uuid = randint(10000000, 99999999)

                user = User(uuid)

                if not user.is_registered:
                    break

            hashed_pw = bcrypt.hashpw(bytes(data['password'].encode('utf-8')), bcrypt.gensalt())

            res = User.register_user(
                _id = uuid,
                first_name = data['first_name'],
                middle_name = data['middle_name'],
                last_name = data['last_name'],
                username = data['username'],
                password_hash = hashed_pw.decode('utf-8'),
                email_address = data['email_address'],
                created_at = data['created_at']
            )
            
            if not res[0]:
                return {
                    'message': res[1],
                    'code': 'REGISTER_UNEXPECTED_FAILURE',
                    'type': 'error'
                }

            return {
                    'message': 'Registration successful.',
                    'code': 'REGISTER_SUCCESS',
                    'type': 'success'
                }
        except Exception as e:
            return {
                'error': str(e),
                'code': 'REGISTER_INTERNAL_FAILURE',
                'type': 'error'
            }

@app.route("/api/user/update", methods = ['POST'])
@cross_origin()
def update_user():
    try:
        data = request.form

        user = User(data['_id'])

        for key, value in dict(data).items():
            if key == "username":
                user.set_username(value)
            elif key == "email_address":
                user.set_email_address(value)
            elif key == "education":
                user.set_educ_level(value)
            elif key == "major":
                user.set_major(value)
            elif key == "occupation":
                user.set_occupation(value)
            elif key == "bio":
                user.set_bio(value)

        return {'s': True}
    except Exception as e:
        return {
            'error': str(e),
            'code': 'UPDATE_USER_INTERNAL_FAILURE',
            'type': 'error'
        }