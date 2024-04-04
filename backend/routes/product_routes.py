from flask import Blueprint, jsonify, request
from models.product import Product
from models.location import Location
from models.log import Log
from utils.db import db

product_routes = Blueprint('product_routes', __name__)

@product_routes.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@product_routes.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    location_id = data.get('location_id')
    quantity = data.get('quantity')
    location = Location.query.get(location_id) if location_id else None
    if location:
        available_capacity = location.capacity - sum(p.quantity for p in location.products)
        if quantity > available_capacity:
            return jsonify({'error': 'Insufficient capacity in the location'}), 400
    product = Product(name=data['name'], quantity=quantity, location=location)
    db.session.add(product)
    db.session.commit()
    log_message = f"Product '{product.name}' created with quantity {product.quantity}"
    log = Log(message=log_message)
    db.session.add(log)
    db.session.commit()
    return jsonify(product.to_dict()), 201

@product_routes.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get(product_id)
    if product:
        data = request.get_json()
        location_id = data.get('location_id')
        quantity = data.get('quantity')
        location = Location.query.get(location_id) if location_id else None
        if location:
            available_capacity = location.capacity - sum(p.quantity for p in location.products if p.id != product.id)
            if quantity > available_capacity:
                return jsonify({'error': 'Insufficient capacity in the location'}), 400
        product.name = data['name']
        product.quantity = quantity
        product.location = location
        db.session.commit()
        log_message = f"Product '{product.name}' updated with quantity {product.quantity}"
        log = Log(message=log_message)
        db.session.add(log)
        db.session.commit()
        return jsonify(product.to_dict())
    else:
        return jsonify({'error': 'Product not found'}), 404