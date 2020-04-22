import os
import threading
from dotenv import load_dotenv
from flask_cors import CORS
from terrazzo import create_app
from terrazzo import db

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)


app = create_app("flask.cfg")
CORS(app)


@app.cli.command()
def createdb():
    from terrazzo import models

    db.create_all()


@app.before_first_request
def activate_job():
    def run_job():
        from nltk.stem import WordNetLemmatizer

        lemmatizer = WordNetLemmatizer()

    thread = threading.Thread(target=run_job)
    thread.start()
