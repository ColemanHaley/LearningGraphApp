from flask import Blueprint

assignments_blueprint = Blueprint("assignments", __name__)

from . import routes
