# Proyecto: EP-EL-SPA

# Examen Practico - Todo List - Single Page Application

Bienvenid@ a **Todo List**. Este repositorio contiene una aplicación de tareas (SPA) desarrollada con el siguiente stack:

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Node.js, Express, MongoDB (Mongoose)

La aplicación permite al usuario:
- Registrarse e iniciar sesión.
- Crear, editar, eliminar y visualizar tareas.
- Agregar, editar y eliminar subtareas y comentarios.
- Filtrar tareas según su estado (pendiente o completada).

---

## Estructura del Proyecto

El proyecto se organiza en dos carpetas principales:

- **frontend/**: Contiene la aplicación Next.js.
- **backend/**: Contiene el servidor Express, con conexión a MongoDB.

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (se instala junto con Node.js)
- [Git](https://git-scm.com/downloads/win) (configurado con su usuario)

---

## Instrucciones

### Clonar Repositorio

1. Crea una carpeta en `Proyecto` en C:\Users\Your_Name\Documents\

2. Desde `Proyecto` abre la terminal **Git Bash**

3. Ejecuta el sifuiente comando para clonar el repositorio
   ```Bash
   git clone < https://github.com/JuandeDiosJC/EP-TL-SPA.git>

4. Verifica es estado de los archivos

   ```bash
   git status

### Configuración de Backend

1. Abre una terminal desde la carpeta `backend` del proyecto e instala todas sus dependencias
   ```bash
   npm install

2. El backend está listo, pero aún no cierres la terminal

### Configuración de Frontend

1. Abre una terminal desde la carpeta `frontend` del proyecto e instala todas sus dependencias
   ```bash
   npm install

2. El frontend está listo, pero aún no cierres la terminal

### Iniciar los Servidores

1. En la terminal del `frontend`y la del `backend` iniciar los servicios con:
   ```bash
   npm run dev

### Abrir Aplicación

1. Abre el navegador de tu preferencia e ingresa a:
   ```bash
   http://localhost:3000 

---

## Navegación

### Registro de Usuario

1. Ingresa tu nombre, ejemplo: `Juan`

2. Ingresa tu correo, ejemplo: `juan@gmail.com`

3. Crea una contraseña, ejemplo: `123juan`

### Ingreso de Usuario

1. Ingresa tu correo previamente registrado

2. Ingresa la contraseña que generaste

### Gestión de Tareas

1. Desde la sección de tareas, puedes crear nuevas tareas, editarlas, eliminarlas o cambiar su estado (pendiente/completada)

2. También podrás agregar, editar y eliminar subtareas y comentarios para cada tarea

3. Usa el control de filtrado para ver únicamente las tareas pendientes, completadas o todas.

### Cierre de Sesión

1. Cuando termines tus actividades no olvides cerrar sesión.

---

## Notas

1. El archivo .env contiene el token de acceso a la base de datos, el cual solo tiene una vigencia de 15 días, por cuestiones de seguridad.

2. El clúster de la base de datos fue configurado para aceptar la conexión desde cualquier IP durante 6 días, después del 22 de febrero de 2025 se perderá comunicación con MongoDB Atlas.