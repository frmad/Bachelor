resource "google_cloud_run_v2_service" "flask-api" {
  name     = "yolov5-flaskapi"
  ingress = "INGRESS_TRAFFIC_ALL"
  location = "europe-north1"

  depends_on = [google_vpc_access_connector.api_connector]

template {
    scaling {
      max_instance_count = 2
    }
    vpc_access{
      connector = google_vpc_access_connector.api_connector.id
      egress = "ALL_TRAFFIC"
    }

    containers {
      image = "europe-north1-docker.pkg.dev/carboplanner/flask-api/flask_api:latest"

      resources {
        limits = {
          memory = "2Gi"
        }
      }

      ports {
        container_port = 5000
      }
    }
  }

 

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}


resource "google_cloud_run_service_iam_binding" "invoker" {
  location = google_cloud_run_v2_service.flask-api.location
  service  = google_cloud_run_v2_service.flask-api.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}



