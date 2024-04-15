import argparse
import io
import base64

import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

DETECTION_URL = "/v1/object-detection"

list_of_images = []

# Load YOLOv5 model
model = torch.hub.load('../../', 'custom', path='./abc123.pt', source='local')


def get_class_name(class_index):
    class_names = {
        0: "Chicken Breast",
        1: "Credit Card",
        2: "Pasta",
        3: "Peas",
        4: "Rice",
        5: "Spinach",
    }
    return class_names.get(class_index, "unknown")


@app.route(DETECTION_URL, methods=["POST"])
def predict():
    if request.method != "POST":
        return jsonify({"error": "Method not allowed"})

    if request.json and "image" in request.json:
        images_data = request.json["image"]

        results = []
        count = 0
        for image_data in images_data:
            if "img" in image_data:
                count = count + 1
                im_bytes = base64.b64decode(image_data["img"])
                im = Image.open(io.BytesIO(im_bytes))
                results.append(im)



        #image_base64 = request.json["image"]
        results = model(results, size=640)  # Perform object detection

        detection_results = []
        for detections in results.xywh:

            for detection in detections:
                class_index = int(detection[5])
                class_name = get_class_name(class_index)
                detection_dict = {
                    "class": class_index,
                    "name": class_name,
                    "x": float(detection[0]),
                    "y": float(detection[1]),
                    "width": float(detection[2]),
                    "height": float(detection[3]),
                    "confidence": float(detection[4])
                }
                detection_results.append(detection_dict)

        return jsonify(detection_results)
    else:
        return jsonify({"error": "No image provided"})


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing YOLOv5 model")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    opt = parser.parse_args()

    from waitress import serve
    serve(app, host="0.0.0.0", port=opt.port)



