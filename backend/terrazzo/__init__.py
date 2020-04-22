from flask import Flask
from os import environ
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Application factory
def create_app(config_filename=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("SQLALCHEMY_DATABASE_URI")
    initialize_extensions(app)
    register_blueprints(app)
    return app


def initialize_extensions(app):
    db.init_app(app)


def register_blueprints(app):
    from terrazzo.users import users_blueprint
    from terrazzo.resources import resources_blueprint
    from terrazzo.machine_learning import machine_learning_blueprint
    from terrazzo.assignments import assignments_blueprint

    app.register_blueprint(users_blueprint, url_prefix="/users")
    app.register_blueprint(resources_blueprint, url_prefix="/resources")
    app.register_blueprint(machine_learning_blueprint, url_prefix="/model")
    app.register_blueprint(assignments_blueprint, url_prefix="/assignments")
