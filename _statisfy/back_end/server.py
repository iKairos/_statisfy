from flask import Flask, request
from flask_cors import CORS
from secret import SECRET_KEY

app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = SECRET_KEY

from routes import user_routes, research_routes, auth_routes

if __name__ == "__main__":
    app.run(debug=True)