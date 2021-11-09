from __main__ import app 
from flask import request
from objects.user import User
from flask_cors import cross_origin

@app.route("/api/login", methods = ['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        data = request.get_json(force=True)

        secret_key = app.config.get('SECRET_KEY')

        auth = User.authenticate(data['username'], data['password'], secret_key)
        
        return {'access_token': auth[2], 'payload': auth[1] if not auth[0] else None}

@app.route(f"/api/user/token/decode/<token>")
@cross_origin()
def decode_token(token):
    secret_key = app.config.get('SECRET_KEY')

    decoded = User.decode_auth_token(token, secret_key)

    if type(decoded) == str:
        return {
            'error': decoded,
            'code': 'TOKEN_FAIL'
        }
    else:
        u = User(decoded)
        return {
            'user': {
                '_id': decoded,
                'first_name': u.first_name,
                'middle_name': u.middle_name,
                'last_name': u.last_name,
                'username': u.username,
                'email_address': u.email_address,
                'nickname': u.nickname,
                'educ_level': u.educ_level,
                'major': u.major,
                'occupation': u.occupation,
                'profile_picture': u.profile_picture,
                'researches': u.research_papers,
                'created_at': u.created_at,
                'bio': u.bio
            },
            'code': 'TOKEN_SUCCESS'
        }