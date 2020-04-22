from flask import Blueprint

users_blueprint = Blueprint("users_blueprint", __name__)

from . import routes
