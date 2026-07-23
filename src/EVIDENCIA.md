# Evidencia: Lista de Verificación y Procedimiento de Respaldo

## 1. Lista de Verificación de Seguridad y Disponibilidad

| # | Elemento a Comprobar | Criterio de Aceptación / Estado |
| :--- | :--- | :--- |
| **1** | **Contraseñas seguras** | Todas las cuentas usan contraseñas de al menos 16 caracteres, combinando mayúsculas, minúsculas, números y símbolos. |
| **2** | **Variables de entorno** | Ninguna credencial está hardcoded. Se leen exclusivamente desde un archivo `.env` protegido. |
| **3** | **Acceso restringido** | El acceso a la base de datos y servidores está limitado por IPs específicas o VPN. |
| **4** | **Copias de seguridad** | Existen respaldos programados automáticos guardados en un almacenamiento aislado. |
| **5** | **Registro de errores** | Los logs registran fallos críticos pero nunca almacenan datos sensibles de los usuarios. |
| **6** | **Disponibilidad del servicio** | Se implementó una herramienta de monitoreo (ej. UptimeRobot) para alertar si el servicio se cae. |
| **7** | **Uso de HTTPS** | El sitio cuenta con un certificado SSL/TLS válido y todo el tráfico HTTP se redirige a HTTPS. |
| **8** | **Protección de archivos** | Los archivos de configuración sensible (ej. `.env`) no son accesibles públicamente. |
| **9** | **Permisos de usuarios** | La aplicación se ejecuta bajo un usuario del sistema sin privilegios de raíz (non-root). |
| **10**| **Actualización de dependencias**| Se ejecutó un análisis de vulnerabilidades y las dependencias están actualizadas. |

---

## 2. Documentación del Procedimiento de Respaldo

### Requisitos Previos
* Terminal de comandos activa en VS Code.
* Credenciales de administrador de la base de datos.

### Procedimiento de Ejecución Manual
Para generar el respaldo, se abre la terminal integrada de VS Code y se ejecuta el siguiente comando:

```bash
mysqldump -u root -p mi_base_datos > respaldo_sistema.sql
```

### Verificación del Respaldo
Se comprueba la existencia del archivo `respaldo_sistema.sql` en el explorador de archivos de VS Code y se valida que su tamaño sea superior a 0 KB. El archivo se añade al `.gitignore` para cumplir con las directivas de seguridad.
