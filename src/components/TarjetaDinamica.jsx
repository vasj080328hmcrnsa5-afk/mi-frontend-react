import { useState } from 'react';

/**
 * EXPLICACIÓN TEÓRICA (Punto 5):
 * 
 * 1. ¿Qué son las propiedades (props)?
 *    Son parámetros o datos que un componente padre le transfiere a un componente hijo.
 *    Son de solo lectura (inmutables); el componente que las recibe no las puede modificar.
 * 
 * 2. ¿Qué es el estado (state)?
 *    Es una memoria interna del componente que almacena información que puede cambiar con el tiempo.
 *    Cuando el estado se actualiza mediante su función (ej. setDisponibilidad), React vuelve a
 *    renderizar el componente para mostrar los cambios visuales de inmediato.
 * 
 * 3. ¿Cuándo utilizar cada uno?
 *    - Utiliza PROPIEDADES para configurar el componente con datos iniciales o estáticos desde fuera.
 *    - Utiliza ESTADO cuando la información dependa de la interacción del usuario (clics, formularios, contadores)
 *      y requieras que la pantalla se actualice en tiempo real.
 */

function TarjetaDinamica({ titulo, descripcion, categoria, estadoInicial }) {
  // Punto 3 y 4: Definición de un estado interno (interruptor) y su función modificadora
  const [disponible, setDisponible] = useState(estadoInicial);

  const cambiarEstado = () => {
    setDisponible(!disponible); // Invierte el valor booleano
  };

  return (
    <div style={{
      border: '2px solid #34495e',
      borderRadius: '10px',
      padding: '20px',
      margin: '15px',
      width: '280px',
      backgroundColor: disponible ? '#e8f8f5' : '#f9ebea',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'background-color 0.3s ease'
    }}>
      <h3>{titulo}</h3>
      <p style={{ fontSize: '14px', color: '#555' }}>{descripcion}</p>
      <span style={{
        backgroundColor: '#34495e',
        color: 'white',
        padding: '3px 8px',
        borderRadius: '5px',
        fontSize: '12px'
      }}>
        {categoria}
      </span>
      
      <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
        Estado actual: <span style={{ color: disponible ? '#27ae60' : '#c0392b' }}>
          {disponible ? 'Disponible' : 'Agotado'}
        </span>
      </p>

      {/* Punto 4: Botón que modifica el estado */}
      <button 
        onClick={cambiarEstado}
        style={{
          backgroundColor: disponible ? '#e74c3c' : '#2ecc71',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
          marginTop: '10px',
          fontWeight: 'bold'
        }}
      >
        {disponible ? 'Marcar como Agotado' : 'Marcar como Disponible'}
      </button>
    </div>
  );
}

export default TarjetaDinamica;
