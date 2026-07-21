function BotonPersonalizado({ texto, onClick }) {
  return (
    <button 
      onClick={onClick} 
      style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', margin: '10px' }}
    >
      {texto}
    </button>
  );
}
export default BotonPersonalizado;
