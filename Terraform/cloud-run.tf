resource "google_cloud_run_v2_service" "cloud_bite_backend" {
  name     = "yolov5-flaskAPI"
  ingress = "INGRESS_TRAFFIC_ALL"
  location = "europe-north1"

  depends_on = []

template {
    scaling {
      max_instance_count = 2
    }
    vpc_access{
      connector = google_vpc_access_connector.api_connector.id
      egress = "ALL_TRAFFIC"
    }

    containers {
      image = "gcr.io/cloud-bite-sdu-401607/cloud-bite-backend"

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
