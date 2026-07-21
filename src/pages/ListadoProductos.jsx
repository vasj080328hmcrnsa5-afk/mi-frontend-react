import React, { useState, useEffect } from 'react';

// Dirección del backend simulado para pruebas locales rápidas
const API_URL = 'https://typicode.com';

function Listado() {
  // Estados para controlar los datos cargados de la API
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorListado, setErrorListado] = useState(null);

  // Estados del Formulario (Registro y Edición)
  const [idEditar, setIdEditar] = useState(null); 
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  // Respuestas del Backend (Éxitos / Errores)
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorBackend, setErrorBackend] = useState('');

  // 1. Obtener listado desde la API (GET)
  const obtenerDatos = async () => {
    try {
      // Cargamos registros simulados iniciales
      const registrosIniciales = [
        { id: 1, title: 'Registro de prueba #1', body: 'Descripción detallada en español para el elemento 1. Muestra el funcionamiento correcto de la integración.' },
        { id: 2, title: 'Registro de prueba #2', body: 'Descripción detallada en español para el elemento 2. Muestra el funcionamiento correcto de la integración.' },
        { id: 3, title: 'Registro de prueba #3', body: 'Descripción detallada en español para el elemento 3. Muestra el funcionamiento correcto de la integración.' },
        { id: 4, title: 'Registro de prueba #4', body: 'Descripción detallada en español para el elemento 4. Muestra el funcionamiento correcto de la integración.' },
        { id: 5, title: 'Registro de prueba #5', body: 'Descripción detallada en español para el elemento 5. Muestra el funcionamiento correcto de la integración.' }
      ];
      setDatos(registrationsIniciales);
    } catch (err) {
      setErrorListado(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  // 2. Controlar alta (POST) y modificación (PUT)
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setErrorBackend('');

    if (!titulo.trim() || !descripcion.trim()) {
      setErrorBackend('Por favor, rellene todos los campos solicitados.');
      return;
    }

    const datosFormulario = { title: titulo, body: descripcion };

    try {
      if (idEditar) {
        // --- PETICIÓN DE MODIFICACIÓN: PUT ---
        const respuesta = await fetch(`${API_URL}/${idEditar}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosFormulario),
        });

        if (!respuesta.ok) throw new Error('El servidor rechazó la actualización del registro.');

        // Actualizar tabla visual automáticamente
        setDatos(datos.map(item => item.id === idEditar ? { ...item, title: titulo, body: descripcion } : item));
        setMensajeExito('¡Registro modificado con éxito!');
        setIdEditar(null);
      } else {
        // --- PETICIÓN DE ALTA: POST ---
        const respuesta = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosFormulario),
        });

        if (!respuesta.ok) throw new Error('El servidor rechazó el nuevo registro.');

        const nuevoItem = { id: datos.length + 1, title: titulo, body: descripcion };
        
        // Agregar al inicio de la tabla automáticamente
        setDatos([nuevoItem, ...datos]);
        setMensajeExito('¡Registro creado con éxito!');
      }

      setTitulo('');
      setDescripcion('');
    } catch (err) {
      setErrorBackend(err.message);
    }
  };

  // Cargar registro seleccionado al formulario superior
  const prepararEdicion = (producto) => {
    setIdEditar(producto.id);
    setTitulo(producto.title);
    setDescripcion(producto.body);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* 1, 2 y 5. FORMULARIO INTEGRADO DE ALTA Y EDICIÓN */}
      <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '8px', marginBottom: '40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e9ecef' }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>
          {idEditar ? '⚠️ Editar Registro Seleccionado' : '➕ Agregar Nuevo Registro'}
        </h3>
        <form onSubmit={manejarEnvio}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Título:</label>
            <input 
              type="text" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              placeholder="Ej. Registro de prueba #6"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Descripción:</label>
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', height: '80px', resize: 'vertical' }}
              placeholder="Escribe la descripción del elemento..."
            />
          </div>

          {/* 3 y 7. Alertas de validación o éxito */}
          {mensajeExito && <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '14px' }}>{mensajeExito}</p>}
          {errorBackend && <p style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '14px' }}>Error: {errorBackend}</p>}

          <button type="submit" style={{ backgroundColor: idEditar ? '#ffc107' : '#007bff', color: idEditar ? '#212529' : 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' }}>
            {idEditar ? 'Actualizar (PUT)' : 'Guardar Registro (POST)'}
          </button>
          
          {idEditar && (
            <button type="button" onClick={() => { setIdEditar(null); setTitulo(''); setDescripcion(''); }} style={{ backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* LISTADO DE REGISTROS CON ESTILOS ELEGANTES */}
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#111' }}>Listado de Registros</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold', color: '#333' }}>IDENTIFICACIÓN</th>
            <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#333' }}>Título</th>
            <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#333' }}>Descripción</th>
            <th style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold', color: '#333' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '15px', textAlign: 'center', color: '#555' }}>{item.id}</td>
              <td style={{ padding: '15px', color: '#222' }}>{item.title}</td>
              <td style={{ padding: '15px', color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{item.body}</td>
              <td style={{ padding: '15px', textAlign: 'center' }}>
                {/* 5. Botón para editar integrado en la fila */}
                <button 
                  onClick={() => prepararEdicion(item)}
                  style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listado;
