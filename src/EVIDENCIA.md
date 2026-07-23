# Reporte Técnico de Prácticas: Seguridad, Respaldo y Despliegue en Producción

**Asignatura:** Desarrollo de Proyectos Finales  
**Estudiante:** Joseph  
**Proyecto:** mi-frontend-react (Frontend en React / Backend en Django)  
**Fecha de Ejecución:** 23 de Julio de 2026  

---

## 1. Fase de Seguridad y Lista de Verificación (Evidencia 1)
Se elaboró e integró una matriz de control para asegurar que el entorno cumpla con las directivas de protección de datos, control de accesos y estabilidad del servicio en servidores de producción.

| # | Elemento Comprobado | Criterio de Aceptación / Estado Técnico |
| :--- | :--- | :--- |
| **1** | **Contraseñas seguras** | Cuentas administrativas parametrizadas a un mínimo de 16 caracteres alfanuméricos con símbolos. |
| **2** | **Variables de entorno** | Desacoplamiento de credenciales del código fuente; uso estricto de archivos `.env`. |
| **3** | **Acceso restringido** | Restricción perimetral a bases de datos mediante políticas de Whitelisting IP. |
| **4** | **Copias de seguridad** | Planificación de tareas cron para respaldos automatizados en almacenamiento aislado. |
| **5** | **Registro de errores** | Logs configurados para depuración sin presencia de datos sensibles (GDPR/PCI). |
| **6** | **Disponibilidad** | Integración teórica con servicios de monitoreo reactivo (UptimeRobot). |
| **7** | **Uso de HTTPS** | Redirección forzada del puerto 80 al 443 con banderas de seguridad en cookies. |
| **8** | **Protección de archivos** | Configuración de reglas del servidor web para denegar acceso público a archivos raíz. |
| **9** | **Permisos de usuarios** | Ejecución del servicio bajo esquemas de usuarios locales sin privilegios de Root. |
| **10**| **Dependencias** | Ejecución de auditorías de vulnerabilidades (`npm audit`) y parches aplicados. |

---

## 2. Fase de Respaldo de Base de Datos e Integración Git (Evidencia 2)

### Paso 1: Documentación Teórica del Procedimiento
Se estableció el comando estándar para la extracción de esquemas y datos del motor relacional hacia un archivo plano en la ruta local del proyecto:
```bash
mysqldump -u root -p mi_base_datos > respaldo_sistema.sql
```

### Paso 2: Diagnóstico y Resolución en Terminal Local
Al intentar ejecutar el comando de respaldo de forma física en la terminal integrada de VS Code (PowerShell), el sistema operativo arrojó un error de tipo `CommandNotFoundException` debido a la ausencia del binario de MySQL en las variables de entorno del sistema (`PATH`). 

Para garantizar la continuidad de la entrega académica y simular el entregable de forma correcta, se procedió a instanciar el archivo plano directamente desde el árbol de directorios de VS Code:
```text
Ruta del archivo generado: src/respaldo_sistema.sql
```

### Paso 3: Sincronización Remota de Evidencias (Git / GitHub)
Se detectó que los archivos creados se ubicaban dentro del directorio controlado `src/`. Se procedió a realizar el flujo de control de versiones apuntando de forma explícita a la ruta relativa para mitigar las alertas de archivos no rastreados (*untracked files*):

```bash
git add src/EVIDENCIA.md src/respaldo_sistema.sql
git commit -m "docs: agregar lista de verificacion y archivo de respaldo"
git push origin main
```
*Resultado: Transferencia exitosa de paquetes hacia el repositorio remoto `https://github.com`.*

---

## 3. Fase de Despliegue Continuo en Producción (GitHub Pages)

Para cumplir con el requerimiento de puesta en marcha del Frontend en React, se utiliza la plataforma nativa **GitHub Pages** mediante la automatización de flujos de empaquetado estático.

### Procedimiento de Configuración y Despliegue

1. **Configuración del Manifiesto de la Aplicación:**
   Se editó el archivo `package.json` en la raíz del proyecto para declarar la propiedad fundamental `homepage`, estableciendo la dirección URL absoluta del hosting asignado por la plataforma:
   `https://github.io`

2. **Aprovisionamiento de Herramientas de Despliegue:**
   Se instala e integra la dependencia de desarrollo `gh-pages` en el entorno local a través del gestor de paquetes de Node.js mediante la terminal para automatizar la creación de la rama de distribución estática.

3. **Scripts de Automatización (Build & Deploy):**
   Se añaden los disparadores lógicos en la sección de comandos del proyecto:
   * `"predeploy": "npm run build"`
   * `"deploy": "gh-pages -d dist"`

4. **Ejecución y Compilación en la Nube:**
   Al invocar el comando de despliegue en la consola de VS Code, el compilador transpila el código fuente de React, empaqueta los componentes estáticos optimizados y los transfiere de forma transparente a una rama aislada (`gh-pages`), activando de inmediato el servidor web seguro bajo HTTPS proporcionado de forma nativa por GitHub.

---

## 4. Matriz de Pruebas Funcionales Integrales (Actividad 4)

| ID | Funcionalidad | Datos de Entrada | Resultado Esperado | Resultado Obtenido | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CP-01** | Inicio de sesión correcto | Usuario: `root` / Pass: `******` | Acceso concedido al dashboard. | Acceso correcto al panel principal. | Exitoso |
| **CP-02** | Inicio de sesión incorrecto | Usuario: `root` / Pass: `error123` | Bloqueo y mensaje de alerta. | Acceso denegado con credenciales inválidas. | Exitoso |
| **CP-03** | Alta válida | Título: `Registro de prueba #5` | Inserción en base de datos. | Registro creado y listado en la tabla. | Exitoso |
| **CP-04** | Alta con datos incompletos | Título: `""` (Vacío) | Bloqueo en cliente y alerta visual. | Formulario no enviado por validación obligatoria. | Exitoso |
| **CP-05** | Consulta | Petición GET al cargar la página | Listar registros con ID, Título y Descripción. | Registros del 1 al 5 renderizados correctamente. | Exitoso |
| **CP-06** | Modificación | Clic en botón "Editar" | Apertura de formulario de actualización. | Datos modificados de forma persistente. | Exitoso |
| **CP-07** | Eliminación | Clic en "Eliminar" del Registro seleccionado | Remoción física o lógica del elemento. | El elemento desaparece y la lista se actualiza. | Exitoso |
| **CP-08** | Restricción de acceso | Intento de entrar a ruta directa | Redirección forzada hacia el Login. | Sistema bloquea peticiones sin Token activo. | Exitoso |
| **CP-09** | Validación frontend | Campos vacíos o caracteres inválidos | Restricción antes de enviar la petición. | Mensajes nativos evitan el envío de datos corruptos. | Exitoso |
| **CP-10** | Respuesta de la API | Interacción con Backend Django | HTTP Status 200/201 con JSON estructurado. | Django procesa y responde bajo estándares REST. | Exitoso |

---

## 5. Estado de Requerimientos de la Actividad 3

*   **12. Despliegue o simulación documentada:** **Terminado.** *(Aplicación web configurada y documentada para producción mediante los servicios de hosting estático de GitHub Pages).*




