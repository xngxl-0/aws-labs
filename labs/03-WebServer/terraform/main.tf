resource "aws_security_group" "Web-SG-Terraform"{
    name       = "Web-SG-Terraform"
    description = "Security group para el servidor web creado con Terraform"
    vpc_id = var.VPC_id

    ingress = {
        description = "HTPP"
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
  
    }
    ingress {
        description = "HTTPS"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

}


resource "aws_iam_role" "ec2_ssm_role" {
  name = "EC2-SSM-Role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ec2.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })
}



resource "aws_iam_role_policy_attachment" ssm{
     role       = aws_iam_role.ec2_ssm_role.name
     policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ec2_ssm_profile"{
      name = "EC2-SSM-Profile"
      role = aws_iam_role.ec2_ssm_role.name
}


resource "aws_instance" "web"{
    ami = var.ami_id
    instance_type = var.instance_type
    subnet_id = var.subnet_id
    vpc_security_group_ids = [
        aws_security_group.Web-SG-Terraform.id
    ]

    iam_instance_profile = aws_iam_instance_profile.ec2_ssm_profile.name

    user_data = var.user_data

    tags = {
        Name = var.server_name
    }
}