---

# Actividad 4: Pruebas Funcionales Integrales

## Matriz de Pruebas Ejecutada

| ID | Funcionalidad | Datos de Entrada | Resultado Esperado | Resultado Obtendido | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CP-01** | Inicio de sesión correcto | Usuario: `root` / Pass: `******` | Acceso concedido al dashboard. | Acceso correcto al panel principal. | exitoso |
| **CP-02** | Inicio de sesión incorrecto | Usuario: `root` / Pass: `error123` | Bloqueo y mensaje de alerta. | Acceso denegado con credenciales inválidas. | exitoso |
| **CP-03** | Alta válida | Título: `Registro de prueba #3` | Inserción en base de datos. | Registro creado y listado en la tabla. | exitoso |
| **CP-04** | Alta con datos incompletos | Título: `""` (Vacío) | Bloqueo en cliente y alerta visual. | Formulario no enviado por validación obligatoria. | exitoso |
| **CP-05** | Consulta | Petición GET al cargar la página | Listar registros con ID, Título y Descripción. | Registros 3, 4 y 5 renderizados correctamente. | exitoso |
| **CP-06** | Modificación | Clic en botón "Editar" | Apertura de formulario de actualización. | Datos modificados de forma persistente. | exitoso |
| **CP-07** | Eliminación | Clic en "Eliminar" del Registro #2 | Remoción física o lógica del elemento. | Mensaje: "¡Registro #2 eliminado con éxito...". | exitoso |
| **CP-08** | Restricción de acceso | Intento de entrar a ruta directa | Redirección forzada hacia el Login. | Sistema bloquea peticiones sin Token activo. | exitoso |
| **CP-09** | Validación frontend | Campos vacíos o caracteres inválidos | Restricción antes de enviar la petición. | Mensajes nativos evitan el envío de datos corruptos. | exitoso |
| **CP-10** | Respuesta de la API | Interacción con Backend Django | HTTP Status 200/201 con JSON estructurado. | Django procesa y responde bajo estándares REST. | exitoso |


