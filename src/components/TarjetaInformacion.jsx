function TarjetaInformacion({ nombre, precio, descripcion }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '15px', width: '250px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
      <h3>{nombre}</h3>
      <p style={{ color: '#27ae60', fontWeight: 'bold' }}>${precio}</p>
      <p>{descripcion}</p>
    </div>
  );
}
export default TarjetaInformacion;
