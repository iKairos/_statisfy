from flask import Flask

app = Flask(__name__)

@app.route("/api")
def api_home():
    return {"test": [1,2,3,4,5]}

if __name__ == "__main__":
    app.run(debug=True)