from types import resolve_bases
from flask import Flask, request
from flask_cors import CORS, cross_origin
from objects.user import User
from objects.research import Research
from secret import SECRET_KEY
from random import randint
import bcrypt, datetime

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = SECRET_KEY

# ========================= USER ROUTES =========================

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
                'password_hash': user.password_hash,
                'email_address': user.email_address,
                'nickname': user.nickname,
                'educ_level': user.educ_level,
                'major': user.major,
                'occupation': user.occupation,
                'profile_picture': user.profile_picture,
                'researches': user.research_papers
            }
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
                    'type': 'danger'
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
                'type': 'danger'
            }

# ========================= RESEARCH ROUTES =========================

@app.route("/api/research/<id>")
@cross_origin()
def fetch_research(id):
    research = Research(id)

    if not research.is_registered:
        return {
            'error': 'Research does not exist.',
            'code': 'RESEARCH_NOT_EXIST'
        }

    return {
        'research' : {
            '_id': id, 
            'research_name': research.research_name,
            'research_description': research.research_description,
            'dataset': research.dataset_directory,
            'test_type': research.test_type,
            'authors': research.authors
        }
    }

# ========================= AUTH ROUTES =========================

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
                'created_at': u.created_at
            },
            'code': 'TOKEN_SUCCESS'
        }

if __name__ == "__main__":
    app.run(debug=True)