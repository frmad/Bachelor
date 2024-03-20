resource "google_storage_bucket" "default" {
  name          = "cccg6-frontend-bucket"
  location      = "europe-west1"
  uniform_bucket_level_access = true
  storage_class = "STANDARD"   

  force_destroy = true          

  versioning {
    enabled = true  # Enable versioning for the bucket
  }

  website {
    main_page_suffix = "index.html"  
    not_found_page   = "404.html"    
  }
}