terraform {
  required_providers {
    google = {
        source  = "hashicorp/google"
        version = "5.21.0"
    }
  }
  backend "gcs" {
    bucket  = "cp-tfstate-fos"
    prefix  = "terraform/state"
  }
}

provider "google" {
  project = "carboplanner"
  region  = "europe-north1"
  zone    = "europe-north1-c"
}