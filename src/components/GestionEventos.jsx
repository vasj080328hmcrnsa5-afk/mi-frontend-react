import { useState } from 'react';

function GestionEventos() {
  // Estados para controlar los cambios visibles en la interfaz
  const [mensajeClick, setMensajeClick] = useState('Aún no has hecho clic');
  const [textoInput, setTextoInput] = useState('');
  const [listaTareas, setListaTareas] = useState([]);
  const [hoverActivo, setHoverActivo] = useState(false);

  // 1. Manejador para onClick
  const manejarClick = () => {
    setMensajeClick('¡Clic registrado exitosamente!');
  };

  // 2. Manejador para onChange
  const manejarChange = (e) => {
    setTextoInput(e.target.value);
  };

  // 3. Manejador para onSubmit
  const manejarSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (textoInput.trim() === '') return;
    setListaTareas([...listaTareas, textoInput]); // Agrega el texto a la lista
    setTextoInput(''); // Limpia el campo de texto
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Gestión de Eventos en React</h2>

      {/* EJEMPLO 1: onClick */}
      <div style={{ backgroundColor: '#f4f6f7', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
        <h3>1. Evento onClick</h3>
        <button 
          onClick={manejarClick}
          style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Presióname
        </button>
        <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#2980b9' }}>{mensajeClick}</p>
      </div>

      {/* EJEMPLO 2 y 3: onChange y onSubmit (Formulario) */}
      <div style={{ backgroundColor: '#f4f6f7', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
        <h3>2 y 3. Eventos onChange y onSubmit</h3>
        <form onSubmit={manejarSubmit}>
          <input 
            type="text" 
            value={textoInput}
            onChange={manejarChange} 
            placeholder="Escribe un producto nuevo..."
            style={{ padding: '8px', width: '70%', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit"
            style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Agregar
          </button>
        </form>
        
        <p style={{ fontSize: '14px', color: '#7f8c8d', marginTop: '5px' }}>
          Lo que escribes (onChange): <strong>{textoInput}</strong>
        </p>

        <h4 style={{ marginTop: '10px', marginBottom: '5px' }}>Productos agregados (onSubmit):</h4>
        {listaTareas.length === 0 ? <p style={{ fontSize: '13px', color: '#95a5a6' }}>Ninguno todavía</p> : (
          <ul style={{ paddingLeft: '20px', margin: '0' }}>
            {listaTareas.map((tarea, index) => (
              <li key={index} style={{ fontSize: '14px', color: '#27ae60' }}>{tarea}</li>
            ))}
          </ul>
        )}
      </div>

      {/* EJEMPLO 4: onMouseEnter */}
      <div style={{ backgroundColor: '#f4f6f7', padding: '15px', borderRadius: '8px' }}>
        <h3>4. Evento onMouseEnter</h3>
        <div 
          onMouseEnter={() => setHoverActivo(true)}
          onMouseLeave={() => setHoverActivo(false)}
          style={{ 
            padding: '20px', 
            borderRadius: '6px', 
            textAlign: 'center', 
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: hoverActivo ? '#e74c3c' : '#34495e', 
            color: 'white',
            transition: 'background-color 0.3s ease'
          }}
        >
          {hoverActivo ? '¡El mouse está ADENTRO!' : 'Pasa el mouse por aquí'}
        </div>
      </div>
    </div>
  );
}

export default GestionEventos;
