from flask import Blueprint

machine_learning_blueprint = Blueprint("machine_learning", __name__)

from . import routes
