from flask import Flask
from flask_cors import CORS
from routes.product_routes import product_routes
from routes.location_routes import location_routes
from routes.log_routes import log_routes
from utils.db import db

app = Flask(__name__)
CORS(app)

app.config.from_object('config')
db.init_app(app)

app.register_blueprint(product_routes)
app.register_blueprint(location_routes)
app.register_blueprint(log_routes)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)