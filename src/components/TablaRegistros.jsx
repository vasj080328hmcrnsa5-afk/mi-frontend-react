import React from 'react';

const TablaRegistros = ({ datos, prepararEdicion, manejarEliminar }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
          <th style={{ padding: '15px', textAlign: 'center', color: '#333' }}>IDENTIFICACIÓN</th>
          <th style={{ padding: '15px', textAlign: 'left', color: '#333' }}>Título</th>
          <th style={{ padding: '15px', textAlign: 'left', color: '#333' }}>Descripción</th>
          <th style={{ padding: '15px', textAlign: 'center', color: '#333' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item) => (
          // Punto 7: Asegura una clave única por elemento
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '15px', textAlign: 'center', color: '#555' }}>{item.id}</td>
            <td style={{ padding: '15px', color: '#111', fontWeight: '500' }}>{item.title}</td>
            <td style={{ padding: '15px', fontSize: '14px', color: '#666', lineHeight: '1.5' }}>{item.body}</td>
            <td style={{ padding: '15px', textAlign: 'center', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button 
                type="button"
                onClick={() => prepararEdicion(item)}
                style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
              >
                Editar
              </button>
              {/* Punto 1: Agregar un botón para eliminar */}
              <button 
                type="button"
                onClick={() => manejarEliminar(item.id)}
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Punto 5: Evita renderizados innecesarios de la lista si los datos siguen igual
export default React.memo(TablaRegistros);

