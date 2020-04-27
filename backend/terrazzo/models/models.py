from terrazzo import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text as sa_text


class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    isfile = db.Column(db.Boolean, nullable=False, default=False)
    content = db.Column(db.Text, nullable=False)
    uid = db.Column(
        UUID(as_uuid=True), unique=True, server_default=sa_text("uuid_generate_v4()")
    )


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(254), unique=True)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(254), nullable=False, unique=True)
    salt = db.Column(db.String(64), nullable=False)
    hash = db.Column(db.String(512), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey("profile.id"))

    def as_dict(self):
        return {email: self.email, profile_id: self.profile_id}
