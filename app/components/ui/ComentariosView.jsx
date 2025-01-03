import { useEffect, useState } from "react";
import EditComentarioModal from "./EditComentarioModal";
import NewComentarioModal from "./NewComentarioModal";
import { useAuthContext } from "../../context/AuthContext";
import { updateTareaEstado } from "../../lib/tareasEstados";

const ComentariosView = ({
  comentarios,
  tarea,
  setComentarios,
  setCurrentTarea,
  setTareas,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedComentario, setSelectedComentario] = useState({});
  const [allFinished, setAllFinished] = useState(false);
  const { currentUser } = useAuthContext();
  console.log(tarea);

  useEffect(() => {
    const result =
      comentarios.every((comentario) => comentario.finished) || !comentarios;
    setAllFinished(result);
  }, [comentarios, tarea]);

  const openEditModal = (comentario) => {
    if (currentUser.commenting || currentUser.finishing) {
      setSelectedComentario(comentario);
      setIsEditOpen(true);
    }
  };
  const closeEditModal = () => setIsEditOpen(false);

  const endTask = async (e) => {
    e.preventDefault();
    await updateTareaEstado(tarea.tareaId, { finished: true });

    setCurrentTarea({ ...tarea, finished: true });

    setTareas((prevTareas) =>
      prevTareas.map((t) =>
        t.id === tarea.tareaId ? { ...t, finished: true } : t
      )
    );
  };

  const resumeTask = async (e) => {
    e.preventDefault();
    await updateTareaEstado(tarea.tareaId, { finished: false });

    setCurrentTarea({ ...tarea, finished: false });

    setTareas((prevTareas) =>
      prevTareas.map((t) =>
        t.id === tarea.tareaId ? { ...t, finished: false } : t
      )
    );
  };

  return (
    <div className="w-[80%]">
      {comentarios.map((comentario) => {
        return (
          <p
            className="flex gap-4 items-center bg-white px-5 py-3 text-main-gray rounded-md shadow-sm border-[1px]"
            key={comentario.id}
            onClick={() => openEditModal(comentario)}
          >
            {comentario.finished ? (
              <i className="bi bi-check-circle-fill text-main-green text-[20px] mb-auto"></i>
            ) : (
              <i className="bi bi-circle text-main-green text-[20px] mb-auto"></i>
            )}
            <span className="text-sm">{comentario.description}</span>
          </p>
        );
      })}
      {currentUser.commenting && (
        <NewComentarioModal
          tareaEstadoId={tarea.tareaId}
          setComentarios={setComentarios}
        />
      )}
      {isEditOpen && (
        <EditComentarioModal
          closeModal={closeEditModal}
          comentario={selectedComentario}
          setComentarios={setComentarios}
          currentUser={currentUser}
        />
      )}
      {allFinished && currentUser.finishing && !tarea.finished && (
        <button
          className="z-20 bg-[#348E28] text-white py-1 px-4 rounded-md absolute bottom-[30px] right-[10%] flex gap-2 items-center shadow-lg"
          onClick={endTask}
        >
          <i className="bi bi-check2 text-[20px]"></i>
          <span className="">Finalizar tarea</span>
        </button>
      )}
      {allFinished && currentUser.finishing && tarea.finished && (
        <button
          className="z-20 bg-main-red text-white py-1 px-4 rounded-md absolute bottom-[30px] right-[10%] flex gap-2 items-center shadow-lg"
          onClick={resumeTask}
        >
          <i className="bi bi-arrow-clockwise text-[20px]"></i>
          <span className="">Reactivar tarea</span>
        </button>
      )}
    </div>
  );
};

export default ComentariosView;
