const BASE_URL = process.env.REACT_APP_API_URL;

export async function getServicios() {
  const response = await fetch(`${BASE_URL}/api/services`);
  if (!response.ok) throw new Error("Error al cargar servicios");
  return response.json();
}

export async function crearServicio(payload) {
  const res = await fetch(`${BASE_URL}/api/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error creando servicio");
  }

  return res.json();
}

export async function actualizarServicio(id, payload) {
  const res = await fetch(`${BASE_URL}/api/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error actualizando servicio");
  }

  return res.json();
}
