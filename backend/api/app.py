from flask import Flask, jsonify
from flask_cors import CORS
import sys

sys.path.append("..")
import generating

app = Flask(__name__)

CORS(app)


@app.route("/")
def index():
    return jsonify(["dependency_parsing.txt", "language_modelling.txt"])


@app.route("/resource/<id>", methods=["GET"])
def get_resource(id):
    with open("../topics/" + id) as f:
        return jsonify("\n".join(f.readlines()))


@app.route("/generate", methods=["GET"])
def get_prediction():
    return jsonify(generating.get_predicted_topics())
