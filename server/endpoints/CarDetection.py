from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import base64
from model.detection import detect_cars

class PredictCars(Resource):
    def get(self, filename):
        pred_image, vehicles = detect_cars('assets/', filename)        
        if(vehicles != -100):
            try:
                with open(pred_image, "rb") as image_file:
                    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                return jsonify({"message": "Processed", "vehicles": vehicles, "image": encoded_string})
            except Exception as e:
                return {"message": "Error: Unable to read image"}, 500
        else: 
            return {"message": "Error Detecting Cars in the Image"}, 500