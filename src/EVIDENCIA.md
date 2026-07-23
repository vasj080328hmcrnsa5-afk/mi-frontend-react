---

# Actividad 3: Revisión de Requerimientos del Proyecto Final

## 1. Matriz de Avance del Sistema

| # | Requerimiento del Sistema | Estado (Terminado / Parcial / Pendiente) |
| :--- | :--- | :--- |
| **1** | **Base de datos diseñada y normalizada** | Terminado |
| **2** | **Backend desarrollado con Django** | Terminado |
| **3** | **API REST** | Terminado |
| **4** | **Autenticación** | Terminado |
| **5** | **Operaciones CRUD** | Terminado |
| **6** | **Frontend desarrollado con React** | Terminado |
| **7** | **Formularios con validación** | Terminado |
| **8** | **Interfaz responsiva** | Terminado |
| **9** | **Repositorio Git** | Terminado |
| **10**| **Documentación** | Terminado |
| **11**| **Pruebas** | Parcial |
| **12**| **Despliegue o simulación documentada**| Terminado |

---

## 2. Documentación del Despliegue en Producción (Vercel)

Para cumplir con el requerimiento de puesta en marcha del Frontend en React, se utiliza la plataforma **Vercel** integrada directamente con el flujo de trabajo de GitHub.

### Procedimiento de Configuración y Despliegue

1. **Creación de cuenta e inicio de sesión:**
   Se ingresa a `vercel.com` y se inicia sesión vinculando de forma directa la cuenta institucional o personal de **GitHub**.

2. **Importación del Repositorio:**
   * En el panel principal de Vercel, se hace clic en **"Add New"** y luego en **"Project"**.
   * Se selecciona el repositorio correspondiente al proyecto actual: `mi-frontend-react`.

3. **Configuración del Framework:**
   * Vercel detecta automáticamente que el proyecto está estructurado con **React** (o Vite/Create React App).
   * Se configuran los comandos por defecto en el panel visual:
     * *Build Command:* `npm run build`
     * *Output Directory:* `dist` (o `build` según la configuración de empaquetado).

4. **Variables de Entorno (Producción):**
   * En la sección *Environment Variables*, se añade la llave `REACT_APP_API_URL` o `VITE_API_URL` apuntando a la dirección URL de producción del servidor Backend en Django.

5. **Lanzamiento (Deploy):**
   * Se hace clic en el botón **"Deploy"**. Tras finalizar la compilación automatizada de los paquetes, Vercel genera un enlace HTTPS seguro de libre acceso público a internet.

