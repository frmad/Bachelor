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

# Load YOLOv5 model
model = torch.hub.load('../../', 'custom', path='./abc123.pt', source='local')

@app.route(DETECTION_URL, methods=["POST"])
def predict():
    if request.method != "POST":
        return jsonify({"error": "Method not allowed"})

    if request.json and "image" in request.json:
        image_base64 = request.json["image"]
        im_bytes = base64.b64decode(image_base64)
        im = Image.open(io.BytesIO(im_bytes))

        results = model(im, size=640)  # Perform object detection

        return results.pandas().xyxy[0].to_json(orient="records")
    else:
        return jsonify({"error": "No image provided"})


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing YOLOv5 model")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    opt = parser.parse_args()

    from waitress import serve
    serve(app, host="0.0.0.0", port=opt.port)
