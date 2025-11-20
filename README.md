# 🚀 API REST de Tareas (To-Do List)

Este proyecto implementa una API REST básica para la gestión de tareas (**CRUD**: Crear, Leer, Actualizar, Eliminar) utilizando **Node.js** y **Express.js** para el *backend*, y **HTML, CSS, y JavaScript (Vanilla JS)** para el *frontend*.

La aplicación sigue el patrón de **Separación de Responsabilidades (MVC)** en el *backend* y simula el almacenamiento de datos en memoria (usando un archivo JSON).

---

## 💻 Descripción del Proyecto

### ⚙️ Backend (API REST)

El *backend* proporciona los siguientes *endpoints* REST que gestionan la entidad **Tarea** con sus campos: `id`, `title`, `description` y `completed`.

| Método | Endpoint | Descripción | Cuerpo de Petición (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Obtiene todas las tareas. | - |
| **POST** | `/api/tasks` | Crea una nueva tarea. | `{ "title": "...", "description": "..." }` |
| **GET** | `/api/tasks/:id` | Obtiene una tarea específica. | - |
| **PUT` | `/api/tasks/:id` | Actualiza campos de una tarea (actualización parcial). | `{ "completed": true }` |
| **DELETE** | `/api/tasks/:id` | Elimina una tarea por su ID. | - |

### 🎨 Frontend (Cliente)

El *frontend* es una aplicación de una sola página construida con Vanilla JS que se comunica con el *backend* a través de la API nativa **`fetch`**. Permite visualizar la lista, agregar nuevas tareas, y marcar/desmarcar tareas como completadas usando *checkboxes*.

---

## 🛠️ Configuración y Ejecución

Para iniciar la aplicación, debes ejecutar el **Backend** y luego el **Frontend**.

### 1. ⬇️ Clonar el Repositorio e Instalar Dependencias

Abre tu terminal y clona el proyecto (reemplaza la URL con la de tu repositorio):

```bash
git clone https://github.com/martinrioss/ToDo-backend.git
cd todo-api-express
