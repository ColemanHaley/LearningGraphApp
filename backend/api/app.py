from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
import threading

sys.path.append("..")
# import generating
import topic_modeling

app = Flask(__name__)

CORS(app)

lemmatizer = None


@app.before_first_request
def activate_job():
    def run_job():
        from nltk.stem import WordNetLemmatizer

        lemmatizer = WordNetLemmatizer()

    thread = threading.Thread(target=run_job)
    thread.start()


@app.route("/")
def index():
    return jsonify(["dependency_parsing.txt", "language_modelling.txt"])


@app.route("/resource/<id>", methods=["GET"])
def get_resource(id):
    with open("../topics/" + id) as f:
        return jsonify("\n".join(f.readlines()))


"""
@app.route("/generate", methods=["GET"])
def get_prediction():
    return jsonify(generating.get_predicted_topics())
"""


@app.route("/get_topics", methods=["POST"])
def get_topics():
    # print(request.data)
    r = jsonify(topic_modeling.get_results(request.data))
    print(r)
    return r


@app.route("/assignment/")
def assignment_name():
    return jsonify(["assignment_1.txt", "assignment_2.txt"])


@app.route("/assignment/<id>", methods=["GET"])
def get_assignment(id):
    with open("../../frontend/src/sample/" + id) as f:
        return jsonify("\n".join(f.readlines()))


@app.route("/analytics/<id>", methods=["GET"])
def view_submission(id):
    with open("../../frontend/src/sample/" + id) as f:
        return jsonify("\n".join(f.readlines()))
