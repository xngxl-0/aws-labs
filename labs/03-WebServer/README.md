Laboratio 03:

                    INTERNET
                       │
                       ▼
                 Internet Gateway
                       │
                       ▼
              ┌──────────────────┐
              │   Subred pública │
              │                  │
              │       EC2        │
              │   Web/API        │
              └────────┬─────────┘
                       │
                       │ TCP 3306
                       │
                       ▼
              ┌──────────────────┐
              │  Subred privada  │
              │                  │
              │       RDS        │
              │      MySQL       │
              └──────────────────┘


Se irá creando la base de datos en próximas actualizaciones.