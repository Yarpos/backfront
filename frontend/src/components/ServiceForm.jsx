import { useState } from "react";

import "../css/Inicio.css";


function ServiceForm({ onGuardar, loading }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Validación frontend
    if (!nombre.trim() || !descripcion.trim()) {
      setMsg("Nombre y descripción son obligatorios.");
      return;
    }
    if (nombre.trim().length < 3) {
      setMsg("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    // Ejecuta guardado (Home maneja el try/catch)
    const ok = await onGuardar({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
    });

    // Si Home devuelve true, limpiamos
    if (ok) {
      setNombre("");
      setDescripcion("");
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <h3 className="nuervicio">Nuevo Servicio</h3>

      <input
      className="Nombre"
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        disabled={loading}
      />

      <input
      className="Desc"
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        disabled={loading}
      />

      <button type="submit" disabled={loading} className="Guardar">
        {loading ? "Guardando..." : "Guardar"}
      </button>

      {msg && <p>{msg}</p>}
    </form>
  );
}

export default ServiceForm;