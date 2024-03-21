resource "google_compute_network" "network" {
  provider = google-beta
  name     = "static_endpoint"
}

resource "google_compute_subnetwork" "subnet" {
  provider      = google-beta
  name          = "static-subnet"
  ip_cidr_range = "10.124.0.0/28"
  network       = google_compute_network.network.id
  region        = "eu-north1"
}

resource "google_project_service" "vpc" {
  provider           = google-beta
  service            = "vpcaccess.googleapis.com"
  disable_on_destroy = false
}

resource "google_vpc_access_connector" "api_connector" {
  provider = google-beta
  name     = "api-connector"
  region   = "eu-north1"

  subnet {
    name = google_compute_subnetwork.subnet.name
  }

  # Wait for VPC API enablement
  # before creating this resource
  depends_on = [
    google_project_service.vpc
  ]
}

resource "google_compute_router" "vpc_NAT" {
  provider = google-beta
  name     = "public-ip-router"
  network  = google_compute_network.network.name
  region   = google_compute_subnetwork.subnet.region
}

resource "google_compute_address" "static_ip" {
  provider = google-beta
  name     = "api-static-ip"
  region   = google_compute_subnetwork.subnet.region
}

resource "google_compute_router_nat" "compute_NAT" {
  provider = google-beta
  name     = "api-static-nat"
  router   = google_compute_router.vpc_NAT.name
  region   = google_compute_subnetwork.subnet.region

  nat_ip_allocate_option = "MANUAL_ONLY"
  nat_ips                = [google_compute_address.static_ip.self_link]

  source_subnetwork_ip_ranges_to_nat = "LIST_OF_SUBNETWORKS"
  subnetwork {
    name                    = google_compute_subnetwork.subnet.id
    source_ip_ranges_to_nat = ["ALL_IP_RANGES"]
  }
}