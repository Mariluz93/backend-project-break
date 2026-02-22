# Tienda de ropa

Hemos creado una aplicación web que simula una tienda de ropa con un catálogo público de productos y un dashboard para el administrador. Esta aplicación ha sido desarrollada con Node.js y MongoDB. Además,  hemos subido las imágenes con Cloudinary. Incluye un filtrado por productos tanto en la web del cliente como en el de administrador. El panel de administrador está protegido por autenticación. Además, hemos incluido una API REST en formato JSON para permitir la integración futura con un frontend en React.

## Enlaces de interés

- Producción en Render: https://backend-project-break-fu9e.onrender.com
- Repositorio en GitHub: https://github.com/Mariluz93/backend-project-break


## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Cloudinary
- Multer
- dotenv
- Express-session
- Method-override
- Render
- Template literals (SSR)


## Funcionalidades

### Catálogo público

- Visualización de todos los productos
- Filtrado por categoría
- Vista del detalle de cada producto
- Renderizado dinámico mediante SSR

### Panel de administrador (Dashboard)

- Login protegido mediante sesión
- Creación de nuevos productos
- Edición de productos existentes desde la página de detalle del producto
- Eliminación de productos existentes desde la página de detalle del producto
- Subida de imágenes a Cloudinary
- Rutas protegidas mediante middleware

### API REST

Hemos implementado una API que permite realizar operaciones CRUD en formato JSON


## Rutas principales
### Rutas públicas

- GET /products para la visualización de todos los productos
- GET /products/:productId para la visualización del detalle del producto por ID
- GET /products?category= para el filtrado de productos por categoría


### Rutas de autenticación

- GET /login para mostrar el formulario de login
- POST /login para llevar a cabo la autenticación (login)
- GET /logout para finalizar sesión de administrador

### Rutas protegidas

- GET /dashboard para mostrar todos los productos desde el dashboard de administrador
- GET /dashboard/new para mostrar el formulario para crear un nuevo producto
- POST /dashboard para crear un nuevo producto con subida de imagen incluida
- GET /dashboard/:productId para mostrar el detalle del producto en modo administrador
- GET /dashboard/:productId/edit para mostrar el formulario de edición
- PUT /dashboard/:productId para actualizar el producto
- DELETE /dashboard/:productId/delete para eliminar el producto


### API REST (JSON)
La aplicación incluye una API REST que devuelve los datos en formato JSON para permitir su consumo desde un frontend externo (por ejemplo, React).

- GET /api/products para obtener todos los productos
- GET /api/products/:productId para obtener un producto por su ID
- POST /api/products para crear un producto (requiere autenticación)
- PUT /api/products/:productId para actualizar un producto (requiere autenticación)
- DELETE /api/products/:productId para eliminar un producto (requiere autenticación)


## Gestión de imágenes con Cloudinary
La subida de imágenes se realiza utilizando Multer y Cloudinary mediante middlewares personalizados.

Cuando el administrador selecciona una imagen en el formulario:

- El middleware uploadSingleImage procesa la petición.

- Internamente se utiliza uploadCloudinaryMiddleware, que sube automáticamente la imagen a Cloudinary.

- Cloudinary devuelve una URL pública.

- Esa URL se guarda en la base de datos dentro del campo image del producto.

De esta forma, las imágenes no se almacenan en el servidor, sino en la nube, lo que facilita el despliegue y mantiene la aplicación más ligera.


## Estructura del proyecto

public/
    └── style.css
src/
    ├── config
    │   ├── db.js
    │   ├── cloudinary.js
    ├── controllers
    │   ├── productController.js
    │   ├── authController.js
    │   └── apiProductController.js
    ├── models
    │   └── Product.js
    ├── routes
    │   ├── productRoutes.js
    │   ├── apiProductRoutes.js
    │   └── authRoutes.js
    ├── middlewares
    │   ├── authMiddleware.js
    │    ├──apiAuthMiddleware.js
    │    ├── uploadCloudinaryMiddleware.js
    │   └── uploadSingleImage.js
    ├── helpers
    │   └── template.js
    │   └── getNavBar.js
    │   └── baseHtml.js
    └── index.js
├── .env
├── .gitignore
├── package-lock.json
├── README.md
└── package.json

## Instalación en local

1. Clonar el repositorio:

git clone https://github.com/Mariluz93/backend-project-break.git

2. Instalar dependencias:

npm install

3. Crear archivo .env en la raíz del proyecto:

Añadir las variables de entorno necesarias: MONGO_URI, PORT, CLOUDINARY_CLOUD_NAME=, CLOUDINARY_API_KEY=, CLOUDINARY_API_SECRET=, SESSION_SECRET=, ADMIN_USER= y ADMIN_PASS=

4. Iniciar el servidor:

npm start


## Decisiones técnicas
Hemos utilizado SSR con template literals en lugar de un motor de plantillas externo para comprender mejor el funcionamiento del renderizado del lado del servidor.

Hemos separado la lógica de vistas y API en controladores distintos.

Hemos protegido las rutas del dashboard mediante middleware de autenticación basado en sesión.

Las imágenes no se almacenan en el servidor, sino en Cloudinary, guardando únicamente la URL en la base de datos.


## Despliegue

Hemos desplegado la aplicación con Render en producción verificando que:

- Hemos configurado 0.0.0.0/0 en MongoDB Atlas
- Hemos añadido las variables de entorno en el panel de Render
- Hemos verificado que el proyecto se despliega automáticamente al hacer push a GitHub

## Mejoras futuras

- Implementar tests con Jest y Supertest.
- Añadir documentación Swagger para la API.
- Mejorar la seguridad de sesión en producción.

## Autor

Proyecto desarrollado por María Luz Castro Martín como parte del módulo Backend del curso Full Stack