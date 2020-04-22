from flask import Blueprint

resources_blueprint = Blueprint("resources", __name__)

from . import routes
