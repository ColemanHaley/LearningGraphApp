from . import assignments_blueprint
from flask import jsonify


@assignments_blueprint.route("/")
def assignment_name():
    return jsonify(["assignment_1.txt", "assignment_2.txt"])


@assignments_blueprint.route("/<id>", methods=["GET"])
def get_assignment(id):
    with open("../frontend/src/sample/" + id) as f:
        return jsonify("\n".join(f.readlines()))
