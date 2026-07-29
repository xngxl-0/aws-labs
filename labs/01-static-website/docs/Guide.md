# Servicios AWS utilizados

|Servicio|Función|
|---|---|
|**Amazon S3**|Almacena los archivos de la web estática.|
|**CloudFront**|CDN que distribuye la web con mayor rendimiento y HTTPS.|
|**IAM**|Permisos para Terraform y acceso seguro a AWS.|
|**AWS CLI**|Permite autenticar Terraform mediante credenciales locales.|

---

# Flujo de funcionamiento

```
Usuario
    │
    ▼
CloudFront
    │
    ▼
S3 Bucket
    │
    ├── index.html
    ├── style.css
    └── script.js
```

---

# Recursos que creará Terraform

```
terraform/

provider.tf
versions.tf
main.tf
variables.tf
outputs.tf
terraform.tfvars
```

Terraform desplegará automáticamente:

```
AWS

├── S3 Bucket
│
├── Bucket Website Configuration
│
├── Bucket Policy
│
├── CloudFront Distribution
│
└── Outputs
```

---

# Organización del laboratorio

```
01-static-website
│
├── terraform/
│
├── website/
│
├── diagrams/
│
├── images/
│
├── docs/
│
└── README.md
```

## Organización del laboratorio en Github

``` text
aws-labs
│
├── README.md
├── LICENSE
├── .gitignore
├── docs
│   └── roadmap.md
├── templates
│   └── README-template.md
└── labs
    ├── 01-static-website
    │   ├── README.md
    │   ├── diagrams
    │   │   ├── architecture.drawio
    │   │   └── architecture.png
    │   ├── docs
    │   │   ├── architecture.md
    │   │   ├── deployment.md
    │   │   └── lessons-learned.md
    │   ├── images
    │   ├── scripts
    │   │   └── deploy.ps1
    │   ├── terraform
    │   │   ├── main.tf
    │   │   ├── outputs.tf
    │   │   ├── provider.tf
    │   │   ├── terraform.tfvars
    │   │   ├── variables.tf
    │   │   └── versions.tf
    │   └── website
    │       ├── index.html
    │       ├── error.html
    │       ├── css
    │       │   └── style.css
    │       ├── js
    │       │   └── script.js
    │       └── images
    ├── 02-vpc
    ├── 03-ec2
    ├── 04-cloudwatch
    ├── 05-iam
    ├── 06-lambda
    ├── 07-ecs
    ├── 08-cicd
    └── 09-final-project

```


## ¿Cómo funcionan los archivos Terraform?

| Archivo            | Función                                                        | ¿Se modifica mucho? |
| ------------------ | -------------------------------------------------------------- | ------------------- |
| `provider.tf`      | Configura el proveedor que usará Terraform (AWS en este caso). | Poco                |
| `versions.tf`      | Define las versiones mínimas de Terraform y del proveedor AWS. | Muy poco            |
| `main.tf`          | Contiene los recursos principales que se crearán en AWS.       | Mucho               |
| `variables.tf`     | Declara las variables que utilizará el proyecto.               | Poco                |
| `terraform.tfvars` | Asigna valores a las variables definidas en `variables.tf`.    | Bastante            |
| `outputs.tf`       | Muestra información útil al terminar el despliegue.            | Poco                |





---

# Resultado esperado

Al finalizar el laboratorio Tendremos lo siguiente:

```
Internet
     │
     ▼
https://xxxxxxxx.cloudfront.net
     │
     ▼
Página web estática funcionando
```

---

# Servicios que se usan
- Amazon S3
- Static Website Hosting
- Bucket Policies
- CloudFront
- IAM
- AWS CLI
- Terraform
- Git
- GitHub

---

# Diagrama Estructural
![alt text](../Imagenes/image.png)



---
---
---



# Creación del Lab en la consola de AWS


### Bucket S3

S3 nos permite almacenar datos como objetos, dentro de S3 se crean lo que se llaman buckets; estos buckets o cubos/cajones como queramos llamarlos nos permitirá guardar todos los archivos necesarios para nuestra página web para posteriormente pasar a su Web Hosting integrado.

Crearemos un bucket donde meteremos todos nuestros archivos necesarios para nuestra sencilla página web estática:
![alt text](../Imagenes/image-1.png)

Logramos una arquitectura con Cloudfront + OAC, así que podemos dejar el bloqueo al acceso público activado(es la mejor práctica). Se explicará lo que es OAC en Cloudfront más en siguientes apartados.


## Subida de archivos web al bucket creado

Tras tener el bucket creado, subiremos los archivos de nuestra página web, en mi caso es una web creada con IA para ahorrar tiempo en este pequeño laboratorio, es sencilla pero esta configuración y estructura puede entrar también dentro de páginas web de pymes etc.

![alt text](../Imagenes/image-7.png)
---


## Creación de la distribución de Cloudfront



Cloudfront es un servicio de Content Delivery Network.  cachea contenido en cientos de Edge Locations repartidas por el mundo, para servirlo mucho más cerca y más rápido del usuario final que si viniera siempre desde el origen. Una **Distribution** define uno o varios **Origins** (S3, un ALB, o incluso un servidor HTTP externo fuera de AWS).

![alt text](../Imagenes/image-4.png)


Cloudfront automáticamente nos crea una Política de Bucket, que es el conjunto de reglas de acceso para nuestro bucket. En este caso se aprueba el acceso al bucket al servicio de Cloudfront, pero ojo solo a cloudfront y sólo a este bucket.

![alt text](../Imagenes/image-8.png)

---


## Comprobación del dominio dado por Cloudfront
https://d1prrhe2wjp8xa.cloudfront.net/
![alt text](../Imagenes/image-10.png)

![alt text](../Imagenes/image-11.png)


Tras haber comprobado el correcto funcionamiento del enlace, podemos decir que tenemos nuestra página web estática lista. En caso de querer tenerla registrada con un nombre de dominio y Certificados gestionados por AWS se necesita incluir servicios como route 53 DNS y AWS ACM para gestionar los certificados públicos para dominios que exactamente sean públicos.

---


## ¿Puedo hacerlo con un solo click?
Claro, para eso tenemos lo que es la famosa infraestructura como código (IAC), nos permite definir todos los servicios y parámetros deseados en lenguaje declarativo.
 
En este caso lo haremos con la herramienta Terraform que lo vemos en el directorio llamado Terraform.
 
### ¿Qué es?

Terraform aplica infraestructura como código IAC normalmente utilizada por DevOps.
Terraform es una herramienta para automatizar la creación, gestión y configuración de infraestructura de manera declarativa.

Lee todos los archivos automáticamente que acaban en ".tf" del directorio. 

## ¿Cómo funcionan los archivos Terraform?

| Archivo            | Función                                                        | ¿Se modifica mucho? |
| ------------------ | -------------------------------------------------------------- | ------------------- |
| `provider.tf`      | Configura el proveedor que usará Terraform (AWS en este caso). | Poco                |
| `versions.tf`      | Define las versiones mínimas de Terraform y del proveedor AWS. | Muy poco            |
| `main.tf`          | Contiene los recursos principales que se crearán en AWS.       | Mucho               |
| `variables.tf`     | Declara las variables que utilizará el proyecto.               | Poco                |
| `terraform.tfvars` | Asigna valores a las variables definidas en `variables.tf`.    | Bastante            |
| `outputs.tf`       | Muestra información útil al terminar el despliegue.            | Poco                |



Se puede ver el código en el direcotrio llamado "Terraform".
