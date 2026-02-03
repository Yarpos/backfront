import "../css/Inicio.css";

function Toast({ type = "info", text = "", onClose }) {
  if (!text) return null;

  return (
    <div className="toast">
      <strong>{type.toUpperCase()}:</strong> {text}
      <button onClick={onClose}>
        X
      </button>
    </div>
  );
}

export default Toast;