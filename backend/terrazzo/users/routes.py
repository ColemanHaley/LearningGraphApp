from . import users_blueprint
from flask import request, jsonify, Response
from ..models import User, Profile
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
)
import os
import hashlib
from app import db


def hash_and_salt(pw, salt):
    # TODO: replace with better hash method
    hsh = hashlib.pbkdf2_hmac(
        "sha256",  # The hash digest algorithm for HMAC
        pw.encode("utf-8"),  # Convert the password to bytes
        salt,  # Provide the salt
        100000,  # It is recommended to use at least 100,000 iterations of SHA-256
    )
    return hsh


@users_blueprint.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if (
        data["password"] is None or len(data["password"]) < 8
    ):  # or data['password'] in blacklist
        return jsonify({"error": ["Invalid password"]})
    if data["password"] != data["password_confirm"]:
        return jsonify({"error": ["Passwords don't match"]})
    if user is not None:
        return jsonify({"error": ["A user with that email already exists."]})

    # hash and salt the password
    salt = os.urandom(32)
    hash = hash_and_salt(data["password"], salt)
    new_profile = Profile(email=data["email"])
    new_user = User(
        email=data["email"], salt=salt.hex(), hash=hash.hex(), profile_id=new_profile.id
    )
    db.session.add(new_profile)
    db.session.add(new_user)
    db.session.commit()
    return Response(status=201)


@users_blueprint.route("/login/", methods=["POST"])
def login():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    username = request.json.get("email", None)
    password = request.json.get("password", None)
    if not username:
        return jsonify({"error": ["Missing username."]}), 400
    if not password:
        return jsonify({"error": ["Missing password."]}), 400

    user = User.query.filter_by(email=username).first()
    if user is None:
        return jsonify({"error": ["No user with that email exists."]}), 400

    print(type(bytes.fromhex(user.salt)))
    hash = hash_and_salt(password, bytes.fromhex(user.salt))
    if hash != bytes.fromhex(user.hash):
        return jsonify({"error": ["Incorrect password."]}), 400
        # Use create_access_token() and create_refresh_token() to create our
    # access and refresh tokens
    ret = {
        "access_token": create_access_token(identity=username),
        "refresh_token": create_refresh_token(identity=username),
    }
    return jsonify(ret)


@users_blueprint.route("/refresh/", methods=["POST"])
def refresh():
    current_user = get_jwt_identity()
    ret = {"access_token": create_access_token(identity=current_user, fresh=False)}
    return jsonify(ret), 200
