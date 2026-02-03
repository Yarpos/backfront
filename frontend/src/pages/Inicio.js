import { useEffect, useState } from "react";
import {
  getServicios,
  crearServicio,
  actualizarServicio,
} from "../services/api";

import ServiceForm from "../components/ServiceForm";
import Toast from "../components/Toast";
import SearchBox from "../components/Searchbox";
import ServiceCard from "../components/ServiceCard";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import EditServiceForm from "../components/EditServiceForm";

import "../css/Inicio.css";

function Inicio() {
  const [servicios, setServicios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  const [guardando, setGuardando] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  const [toast, setToast] = useState({ type: "", text: "" });

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: "", text: "" }), 3000);
  };

  const cargar = () => {
    setLoading(true);
    getServicios()
      .then(setServicios)
      .catch(() => showToast("error", "No se pudieron cargar los servicios."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardarServicio = async (payload) => {
    try {
      setGuardando(true);
      await crearServicio(payload);
      showToast("success", "Servicio creado con éxito");
      await cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error guardando servicio");
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const abrirEdicion = (servicio) => {
    setSeleccionado(servicio);
    setEditOpen(true);
  };

  const guardarCambios = async (payload) => {
    try {
      setActualizando(true);
      await actualizarServicio(seleccionado.id, payload);
      showToast("success", "Servicio actualizado ✅");
      setEditOpen(false);
      setSeleccionado(null);
      cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error actualizando");
      return false;
    } finally {
      setActualizando(false);
    }
  };

  const filtrados = servicios.filter((s) =>
    (s.nombre + " " + s.descripcion)
      .toLowerCase()
      .includes(filtro.toLowerCase()),
  );

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="services">Servicios TI</h2>

      <Toast
        type={toast.type}
        text={toast.text}
        onClose={() => setToast({ type: "", text: "" })}
      />

      <ServiceForm onGuardar={guardarServicio} loading={guardando} />

      <SearchBox value={filtro} onChange={setFiltro} />

      {filtrados.length === 0 && <p>No hay resultados</p>}

      {filtrados.map((s) => (
        <ServiceCard key={s.id} servicio={s} onEdit={abrirEdicion} />
      ))}

      <Modal
        open={editOpen}
        title="Editar Servicio"
        onClose={() => setEditOpen(false)}
      >
        <EditServiceForm
          servicio={seleccionado}
          onGuardar={guardarCambios}
          loading={actualizando}
        />
      </Modal>
    </div>
  );
}

export default Inicio;
