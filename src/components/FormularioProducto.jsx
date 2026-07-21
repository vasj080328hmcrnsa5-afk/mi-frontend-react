import React from 'react';

const FormularioProducto = ({ titulo, setTitulo, descripcion, setDescripcion, idEditar, manejarEnvio, cancelarEdicion, mensajeExito, errorBackend }) => {
  return (
    <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '8px', marginBottom: '40px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginTop: 0, color: '#333', textAlign: 'center' }}>
        {idEditar ? '⚠️ Modificar Información (Modo PUT)' : '➕ Registrar Información (Modo POST)'}
      </h3>
      <form onSubmit={manejarEnvio}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título:</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="Ej. Registro de prueba #6"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descripción:</label>
          <textarea 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', height: '80px', resize: 'vertical' }}
            placeholder="Escribe el cuerpo de la descripción..."
          />
        </div>

        {mensajeExito && <p style={{ color: '#28a745', fontWeight: 'bold', textAlign: 'center' }}>{mensajeExito}</p>}
        {errorBackend && <p style={{ color: '#dc3545', fontWeight: 'bold', textAlign: 'center' }}>{errorBackend}</p>}

        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ backgroundColor: idEditar ? '#ffc107' : '#007bff', color: idEditar ? '#212529' : 'white', padding: '10px 25px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' }}>
            {idEditar ? 'Actualizar Registro' : 'Registrar Nuevo'}
          </button>
          
          {idEditar && (
            <button type="button" onClick={cancelarEdicion} style={{ backgroundColor: '#6c757d', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Punto 5: Evita renderizados innecesarios del formulario si sus propiedades no cambian
export default React.memo(FormularioProducto);

