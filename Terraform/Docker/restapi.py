# YOLOv5 🚀 by Ultralytics, AGPL-3.0 license
"""Run a Flask REST API exposing one or more YOLOv5s models."""

import argparse
import io
import base64

import torch
from flask import Flask, request
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
models = {}

DETECTION_URL = "/v1/object-detection/<model>"



@app.route(DETECTION_URL, methods=["POST"])
def predict(model):
    """Predict and return object detections in JSON format given an image and model name via a Flask REST API POST
    request.
    """
    if request.method != "POST":
        return

    if request.json and "image" in request.json:
        im_file = request.json["image"]
        im_bytes = base64.b64decode(im_file)
        im = Image.open(io.BytesIO(im_bytes))

        if model in models:
            results = models[model](im, size=640)  # reduce size=320 for faster inference
            return results.pandas().xyxy[0].to_json(orient="records")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing YOLOv5 model")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    parser.add_argument("--model", nargs="+", default=["yolov5s"], help="model(s) to run, i.e. --model yolov5n yolov5s")
    opt = parser.parse_args()

    for m in opt.model:
        models[m] = torch.hub.load("ultralytics/yolov5", m, force_reload=True, skip_validation=True)

    app.run(host="0.0.0.0", port=opt.port)  # debug=True causes Restarting with stat

