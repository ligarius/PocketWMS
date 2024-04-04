from flask import Blueprint, jsonify, request
from models.location import Location
from models.log import Log
from utils.db import db

location_routes = Blueprint('location_routes', __name__)

@location_routes.route('/locations', methods=['GET'])
def get_locations():
    locations = Location.query.all()
    return jsonify([location.to_dict() for location in locations])

@location_routes.route('/locations', methods=['POST'])
def create_location():
    data = request.get_json()
    existing_location = Location.query.filter_by(name=data['name']).first()
    if existing_location:
        return jsonify({'error': 'Location already exists'}), 400
    location = Location(name=data['name'], capacity=data['capacity'])
    db.session.add(location)
    db.session.commit()
    log_message = f"Location '{location.name}' created with capacity {location.capacity}"
    log = Log(message=log_message)
    db.session.add(log)
    db.session.commit()
    return jsonify(location.to_dict()), 201

@location_routes.route('/locations/<int:location_id>', methods=['PUT'])
def update_location(location_id):
    location = Location.query.get(location_id)
    if location:
        data = request.get_json()
        if location.products:
            return jsonify({'error': 'Location is currently in use'}), 400
        location.name = data['name']
        location.capacity = data['capacity']
        db.session.commit()
        log_message = f"Location '{location.name}' updated with capacity {location.capacity}"
        log = Log(message=log_message)
        db.session.add(log)
        db.session.commit()
        return jsonify(location.to_dict())
    else:
        return jsonify({'error': 'Location not found'}), 404