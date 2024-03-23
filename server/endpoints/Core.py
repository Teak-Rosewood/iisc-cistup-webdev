from flask import Flask, request
from flask_restful import Api, Resource
import cv2 
import base64
import os
class UploadImage(Resource):
    def post(self):
        save_directory = 'assets'
        file = request.files['file']
        file.save(save_directory + '/' + file.filename)
        try:
            cv2.imread('assets/' + file.filename)
            return {"message": "Image Uploaded"}, 200
        except Exception as e:
            return {"message": "Error: Unable to read image"}, 500

class GetImages(Resource):
    def get(self):
        save_directory = 'assets'
        images = os.listdir(save_directory)
        predicted_images = []
        non_predicted_images = []

        for image in images:
            if os.path.isfile(os.path.join(save_directory, image)):
                with open(os.path.join(save_directory, image), "rb") as img_file:
                    encoded_string = base64.b64encode(img_file.read()).decode('utf-8')
                if 'detection_' in image:
                    predicted_images.append(encoded_string)
                else:
                    non_predicted_images.append(encoded_string)

        return {"predicted_images": predicted_images, "non_predicted_images": non_predicted_images}, 200

