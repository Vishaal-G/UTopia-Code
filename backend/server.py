# server.py

from flask import Flask, jsonify, request
from map_markers import MapMarkers

app = Flask(__name__)
markers = MapMarkers()

@app.route('/markers', methods=['GET'])
def get_markers():
    return jsonify(markers.list_markers())

@app.route('/markers', methods=['POST'])
def add_marker():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    popup_text = data.get('popup_text', '')
    markers.add_marker(latitude, longitude, popup_text)
    return jsonify({'message': 'Marker added'}), 201

@app.route('/markers', methods=['DELETE'])
def remove_marker():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    markers.remove_marker(latitude, longitude)
    return jsonify({'message': 'Marker removed'}), 200

if __name__ == '__main__':
    app.run(debug=True)