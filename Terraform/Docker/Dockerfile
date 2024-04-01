# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6 libgl1-mesa-glx -y
RUN pip install waitress
# Set the working directory to /app


# Copy the current directory contents into the container at /app
COPY . /.

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Set working directory to the flask api director to run restapi
WORKDIR /yolov5/utils/flask_rest_api

# Run app.py when the container launches
CMD ["python", "flaskapi.py", "--port=5000"]


# Docker image has beem taken from here : https://dev.to/aneeqmalik/create-restapi-of-yolov5-on-flask-deployed-on-azure-app-service-and-use-in-flutter-app-3c0p