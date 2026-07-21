import { useState } from 'react';

function DiseñoResponsivo() {
  const [alertaVisible, setAlertaVisible] = useState(false);

  const datosSimulados = [
    { id: 1, codigo: 'PROD-01', stock: 15 },
    { id: 2, codigo: 'PROD-02', stock: 8 },
    { id: 3, codigo: 'PROD-03', stock: 24 }
  ];

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 text-primary">Panel de Control Responsivo</h2>

      {alertaVisible && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>¡Éxito!</strong> Operación procesada de manera correcta en el inventario.
          <button type="button" className="btn-close" onClick={() => setAlertaVisible(false)} aria-label="Close"></button>
        </div>
      )}

      <div className="row g-4">
        
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card p-3 shadow-sm h-100">
            <h4 className="card-title h5 mb-3 text-secondary">Acceso Rápido</h4>
            <form onSubmit={(e) => { e.preventDefault(); setAlertaVisible(true); }}>
              <div className="mb-3">
                <label className="form-label fw-bold">Código Interno</label>
                <input type="text" className="form-control" placeholder="Ej: LAP-102" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Cantidad a Registrar</label>
                <input type="number" className="form-control" placeholder="0" min="1" required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Enviar Registro</button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-8">
          <div className="card p-3 shadow-sm h-100">
            <h4 className="card-title h5 mb-3 text-secondary">Existencias en Almacén</h4>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle m-0">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Identificador</th>
                    <th>Disponibilidad</th>
                  </tr>
                </thead>
                <tbody>
                  {datosSimulados.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td><span className="badge bg-secondary">{item.codigo}</span></td>
                      <td className={item.stock < 10 ? "text-danger fw-bold" : "text-success"}>
                        {item.stock} unidades
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DiseñoResponsivo;

