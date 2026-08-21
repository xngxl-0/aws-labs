variable "ami_id" {
  description = "La AMI de la instancia EC2 a ser creada"
  type        = string
}


variable "instance_type" {
  description = "Tipo de instancia EC2 a ser creada"
  default     = "t3.micro"
  type        = string
}

variable "user_data" {
  description = "Script de inicialización de la instancia"
  type        = string
}

variable "VPC_id" {
  description = "ID de la VPC donde se creará la instancia"
  type        = string
}

variable "subnet_id"{
description = "ID de la subred donde se creará la instancia"
  type        = string

}


variable "server_name" {
  description = "Nombre del servidor"
  type        = string
}