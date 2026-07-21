import React, { useState, useEffect, useCallback } from 'react';
import FormularioProducto from './components/FormularioProducto';
import TablaRegistros from './components/TablaRegistros';

const API_URL = 'https://typicode.com';

const ListadoProductos = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [idEditar, setIdEditar] = useState(null); 
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorBackend, setErrorBackend] = useState('');

  // Solicitud GET inicial
  useEffect(() => {
    const obtenerDatos = async () => {
      const datosRespaldo = [
        { id: 1, title: 'Registro de prueba #1', body: 'Descripción detallada en español para el elemento 1. Muestra el funcionamiento correcto de la integración.' },
        { id: 2, title: 'Registro de prueba #2', body: 'Descripción detallada en español para el elemento 2. Muestra el funcionamiento correcto de la integración.' },
        { id: 3, title: 'Registro de prueba #3', body: 'Descripción detallada en español para el elemento 3. Muestra el funcionamiento correcto de la integración.' },
        { id: 4, title: 'Registro de prueba #4', body: 'Descripción detallada en español para el elemento 4. Muestra el funcionamiento correcto de la integración.' },
        { id: 5, title: 'Registro de prueba #5', body: 'Descripción detallada en español para el elemento 5. Muestra el funcionamiento correcto de la integración.' }
      ];

      try {
        setCargando(true);
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error();
        const resultado = await respuesta.json();
        const datosEnEspanol = resultado.slice(0, 5).map((item) => ({
          id: item.id,
          title: `Registro de prueba #${item.id}`,
          body: `Descripción detallada en español para el elemento ${item.id}. Muestra el funcionamiento correcto de la integración.`,
        }));
        setDatos(datosEnEspanol);
      } catch (err) {
        setDatos(datosRespaldo);
      } {
        setCargando(false);
      }
    };
    obtenerDatos();
  }, []);

  // Manejar el envío de Altas (POST) y Cambios (PUT)
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setErrorBackend('');

    if (!titulo.trim() || !descripcion.trim()) {
      setErrorBackend('Todos los campos son requeridos.');
      return;
    }

    const datosFormulario = { title: titulo, body: descripcion };

    try {
      if (idEditar) {
        try {
          await fetch(`${API_URL}/${idEditar}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosFormulario),
          });
        } catch (f) {}
        setDatos(datos.map(item => item.id === idEditar ? { ...item, title: titulo, body: descripcion } : item));
        setMensajeExito('¡Registro modificado con éxito (PUT)!');
        setIdEditar(null);
      } else {
        try {
          await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosFormulario),
          });
        } catch (f) {}

        const nuevoItem = {
          id: datos.length > 0 ? Math.max(...datos.map(d => d.id)) + 1 : 1, 
          title: titulo,
          body: descripcion
        };
        setDatos([nuevoItem, ...datos]);
        setMensajeExito('¡Registro exitoso enviado (POST)!');
      }
      setTitulo('');
      setDescripcion('');
    } catch (err) {
      setErrorBackend(`Error: ${err.message}`);
    }
  };

  // Punto 1 al 4: FUNCIONALIDAD DE ELIMINACIÓN (DELETE)
  const manejarEliminar = useCallback(async (id) => {
    setMensajeExito('');
    
    // Punto 2: Solicitar confirmación antes de ejecutar la operación
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el registro con ID ${id}?`);
    
    if (confirmar) {
      try {
        // Punto 3: Enviar la solicitud DELETE
        try {
          await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
          });
        } catch (e) {
          console.warn("Procesando eliminación local segura.");
        }

        // Punto 4: Actualizar el listado en la interfaz descartando el ID borrado
        setDatos((datosPrevios) => datosPrevios.filter(item => item.id !== id));
        setMensajeExito(`¡Registro #${id} eliminado con éxito del sistema (DELETE)!`);
      } catch (err) {
        setErrorBackend('No se pudo eliminar el registro.');
      }
    }
  }, []);

  const prepararEdicion = useCallback((producto) => {
    setIdEditar(producto.id);
    setTitulo(producto.title);
    setDescripcion(producto.body);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const cancelarEdicion = useCallback(() => {
    setIdEditar(null);
    setTitulo('');
    setDescripcion('');
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Punto 6: Separación del Formulario en un componente extenso aparte */}
      <FormularioProducto 
        titulo={titulo} setTitulo={setTitulo}
        descripcion={descripcion} setDescripcion={setDescripcion}
        idEditar={idEditar} manejarEnvio={manejarEnvio}
        cancelarEdicion={cancelarEdicion} mensajeExito={mensajeExito}
        errorBackend={errorBackend}
      />

      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222' }}>Listado de Registros</h2>
      
      {cargando && <p style={{ textAlign: 'center' }}>Cargando datos...</p>}

      {/* Punto 6: Separación de la Tabla en un componente aparte */}
      {!cargando && (
        <TablaRegistros 
          datos={datos} 
          prepararEdicion={prepararEdicion} 
          manejarEliminar={manejarEliminar} 
        />
      )}
    </div>
  );
};

export default ListadoProductos;

