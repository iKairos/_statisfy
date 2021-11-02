from flask import Flask, request
from objects.user import User, UserAuthentication

app = Flask(__name__)

@app.route("/api/user/<id>")
def fetch_user(id):
    user = User(id)
    
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
            'researches': user.research_papers}
    }

@app.route("/api/login", methods = ['POST'])
def login():
    data = request.get_json()

    auth = UserAuthentication.authenticate(data.username, data.password)

    return {'auth': auth}

if __name__ == "__main__":
    app.run(debug=True)