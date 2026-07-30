resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name

  tags = {
    Herramienta = "Terraform"
    Lab         = "Lab01EngelTapia"
  }
}

resource "aws_s3_object" "index" {
  bucket       = aws_s3_bucket.bucket.id
  key          = "index.html"
  source       = "../website/index.html"
  etag         = filemd5("../website/index.html")
  content_type = "text/html"
}

resource "aws_s3_object" "error" {
  bucket       = aws_s3_bucket.bucket.id
  key          = "error.html"
  source       = "../website/error.html"
  etag         = filemd5("../website/error.html")
  content_type = "text/html"
}

resource "aws_s3_object" "style" {
  bucket       = aws_s3_bucket.bucket.id
  key          = "css/style.css"
  source       = "../website/css/style.css"
  etag         = filemd5("../website/css/style.css")
  content_type = "text/css"
}


resource "aws_s3_object" "javascript" {
  bucket       = aws_s3_bucket.bucket.id
  key          = "js/script.js"
  source       = "../website/js/script.js"
  etag         = filemd5("../website/js/script.js")
  content_type = "application/javascript"
}


