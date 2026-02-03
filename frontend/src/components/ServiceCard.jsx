import "../css/Inicio.css";

function ServiceCard({ servicio, onEdit }) {
  return (
    <div>
      <h3 className="nomser">{servicio.nombre}</h3>
      <p className="nomdesc">{servicio.descripcion}</p>

      <button onClick={() => onEdit(servicio)}>
        Editar
      </button>
    </div>
  );
}

export default ServiceCard;
