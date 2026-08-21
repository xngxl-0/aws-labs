output "instance_id" {
  description = "ID de la instancia EC2"
  value       = aws_instance.web.id
}

output "instance_public_ip" {
  description = "IP publica de la instancia EC2"
  value       = aws_instance.web.public_ip
}

output "instance_private_ip" {
  description = "IP privada de la instancia EC2"
  value       = aws_instance.web.private_ip
}

output "instance_public_dns" {
  description = "DNS publico de la instancia EC2"
  value       = aws_instance.web.public_dns
}

output "security_group_id" {
  description = "ID del Security Group"
  value       = aws_security_group.Web-SG-Terraform.id
}

output "security_group_name" {
  description = "Nombre del Security Group"
  value       = aws_security_group.Web-SG-Terraform.name
}

output "iam_role_name" {
  description = "Nombre del IAM Role utilizado por la EC2"
  value       = aws_iam_role.ec2_ssm_role.name
}

output "instance_profile_name" {
  description = "Nombre del Instance Profile utilizado por la EC2"
  value       = aws_iam_instance_profile.ec2_ssm_profile.name
}

output "web_url" {
  description = "URL HTTP del servidor web"
  value       = "http://${aws_instance.web.public_ip}"
}