import { NavLink } from 'react-router-dom';

function MenuNavegacion() {
  const obtenerEstiloActivo = ({ isActive }) => ({
    color: isActive ? '#3498db' : 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    padding: '8px 15px',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
  });

  return (
    <nav style={{ backgroundColor: '#34495e', padding: '12px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
      <NavLink to="/" style={obtenerEstiloActivo}>Inicio</NavLink>
      <NavLink to="/listado" style={obtenerEstiloActivo}>Listado</NavLink>
      <NavLink to="/registro" style={obtenerEstiloActivo}>Registro</NavLink>
      <NavLink to="/responsivo" style={obtenerEstiloActivo}>Responsivo</NavLink> {/* <-- AGREGAR ESTA LÍNEA */}
      <NavLink to="/acerca" style={obtenerEstiloActivo}>Acerca de</NavLink>
    </nav>
  );
}

export default MenuNavegacion;


