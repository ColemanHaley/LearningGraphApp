from terrazzo import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text as sa_text


class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    contents = db.Column(db.Text, nullable=False)
    uuid = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sa_text("uuid_generate_v4()"),
    )
