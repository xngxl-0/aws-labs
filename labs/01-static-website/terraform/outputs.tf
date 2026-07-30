output "bucket_name" {
  value = aws_s3_bucket.bucket.bucket
}


output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.website.domain_name
}