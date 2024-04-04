from flask import Blueprint, jsonify
from models.log import Log

log_routes = Blueprint('log_routes', __name__)

@log_routes.route('/logs', methods=['GET'])
def get_logs():
    logs = Log.query.all()
    return jsonify([log.to_dict() for log in logs])