from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return jsonify(["dependency_parsing.txt","language_modelling.txt"])


@app.route('/resource/<id>', methods=['GET'])
def get_resource(id):
    with open('../topics/' + id) as f:
        return jsonify('\n'.join(f.readlines()))


@app.route('/assignment/')
def assignment_name():
	return jsonify(["assignment_1.txt"])

@app.route('/assignment/<id>', methods=['GET'])
def get_assignment(id):
	with open('../../frontend/src/sample/' + id) as f:
		return jsonify('\n'.join(f.readlines()))
