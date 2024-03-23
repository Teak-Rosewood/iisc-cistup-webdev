from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_restful import Api

from endpoints.Core import UploadImage, GetImages
from endpoints.CarDetection import PredictCars


class SetupEndpoints:
    api = None
    def __init__(self, app):
        self.api = Api(app)
        app.config['SECRET_KEY'] = 'secret'
        app.host = '0.0.0.0'
        app.port = 5000
        app.debug = True
        self.addResources()

    def addResources(self):
        self.api.add_resource(PredictCars, '/api/cars/predict/<string:filename>')
        self.api.add_resource(UploadImage, '/api/upload')
        self.api.add_resource(GetImages, '/api/images')

app = Flask(__name__)
SetupEndpoints(app)
CORS(app)

if __name__ == '__main__':
    socketio = SocketIO(cors_allowed_origins='*')
    socketio.init_app(app)
    socketio.run(app)