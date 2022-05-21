from flask import Flask
from flask_cors import CORS
from secret import SECRET_KEY
from routes.user_routes import *
from routes.dataset_routes import *
from routes.auth_routes import *
from routes.research_routes import *

# app initialization
app = Flask(__name__)
cors = CORS(app)

# app configurations
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = SECRET_KEY

# url registration
app.add_url_rule('/api/user/fetch/<id>', view_func=fetch_user)
app.add_url_rule('/api/user/new', view_func=register_user, methods=["POST"])
app.add_url_rule('/api/user/update', view_func=update_user, methods=["POST"])

app.add_url_rule('/api/dataset/process', view_func=dataset_details, methods=["POST"])
app.add_url_rule('/api/dataset/get/<filename>/<cols>', view_func=get_dataset)
app.add_url_rule('/api/dataset/study/get/<filename>', view_func=get_study_dataset)

app.add_url_rule('/api/login', view_func=login, methods=['POST'])
app.add_url_rule('/api/user/token/decode/<token>', view_func=decode_token)
app.add_url_rule('/api/user/token/expire/<token>', view_func=expire_token)

app.add_url_rule('/api/research/<id>', view_func=fetch_research)
app.add_url_rule('/api/researches', view_func=fetch_researches, methods=["POST"])
app.add_url_rule('/api/research/new', view_func=add_research, methods=["POST"])
app.add_url_rule('/api/research/study/new', view_func=add_study, methods=["POST"])
app.add_url_rule('/api/research/delete', view_func=delete_research, methods=["POST"])
app.add_url_rule('/api/research/study/fetch', view_func=get_studies, methods=["POST"])
app.add_url_rule('/api/research/study/delete', view_func=delete_study, methods=["POST"])

# connect routes to app
#from routes import user_routes, research_routes, auth_routes, dataset_routes

@app.route("/")
def landing():
    return 'Landing Page'
    
# run the app
if __name__ == "__main__":
    app.run(debug=True, threaded=True)