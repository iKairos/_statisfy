from types import resolve_bases
from flask import Flask, request
from objects.user import User
from objects.research import Research

app = Flask(__name__)

# ========================= USER ROUTES =========================

@app.route("/api/user/<id>")
def fetch_user(id):
    user = User(id)
    
    if not user.is_registered:
        return {
            'error': 'User does not exist.'
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
def fetch_research(id):
    research = Research(id)

    if not research.is_registered:
        return {
            'error': 'Research does not exist.',
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
def login():
    data = request.get_json()

    auth = User.authenticate(data.username, data.password)
    
    return {'authPassed': auth[0], 'uid' if auth[0] else 'error': auth[1]}

if __name__ == "__main__":
    app.run(debug=True)