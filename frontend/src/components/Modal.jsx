import "../css/Inicio.css";

function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
