from . import resources_blueprint
from flask import jsonify, abort, request, Response
from os import environ
import boto3
from ..models import Resource


@resources_blueprint.route("/<id>", methods=["GET"])
def get_resource(id):
    r = Resource.query.filter_by(uid=id).first()  # TODO: is first necessary if unique?
    if r.isfile:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=environ.get("AWS_ACCESS_KEY"),
            aws_secret_access_key=environ.get("AWS_SECRET_KEY"),
        )
        try:
            resource = s3.get_object(Bucket=environ.get("S3_BUCKET_NAME"), Key=id)[
                "Body"
            ]
            return jsonify(str(resource.read(), "utf-8"))
        except:
            abort(404)


@resources_blueprint.route("/", methods=["POST"])
def create_resource():
    if not request.is_json():
        abort(400)
    else:
        data = request.get_json()
        resource = Resource(title=data.title, isfile=data.isfile, content=data.content)
        db.session.add(resource)
        db.session.commit()
        return Response(status=201)


# def get_signed_url("/upload", methods=["POST"])


@resources_blueprint.route("/", methods=["GET"])
def index():
    return jsonify(["dependency_parsing.txt", "language_modelling.txt"])
