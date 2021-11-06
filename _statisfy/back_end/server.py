from types import resolve_bases
from flask import Flask, request
from flask_cors import CORS, cross_origin
from objects.user import User
from objects.research import Research
from secret import SECRET_KEY

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = SECRET_KEY


# ========================= USER ROUTES =========================

@app.route("/api/user/<id>")
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
        
        #return {'authPassed': auth[0], 'uid' if auth[0] else 'error': auth[1], 'access_token': auth[2]}
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
                'password_hash': u.password_hash,
                'email_address': u.email_address,
                'nickname': u.nickname,
                'educ_level': u.educ_level,
                'major': u.major,
                'occupation': u.occupation,
                'profile_picture': u.profile_picture,
                'researches': u.research_papers
            },
            'code': 'TOKEN_SUCCESS'
        }

if __name__ == "__main__":
    app.run(debug=True)