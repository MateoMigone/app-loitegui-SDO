import { useState } from "react";
import Button from "./Button";
import { createComentario } from "../../lib/comentarios";
import Spinner from "./Spinner";

const NewComentarioModal = ({ tareaEstadoId, setComentarios }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newComentario = await createComentario(description, tareaEstadoId);
    setComentarios((prevComentarios) => [...prevComentarios, newComentario]);
    setLoading(false);
    closeModal();
  };

  return (
    <>
      <Button text={"Agregar comentario"} onClick={openModal}>
        <i className="bi bi-plus text-[25px]"></i>
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          {/* Modal Panel */}
          <div
            className="bg-white rounded-lg shadow-lg pt-3 pb-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
          >
            <div className="flex justify-between items-center mb-3 px-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Nueva observación
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-[30px]"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <hr className="mb-8" />
            <form onSubmit={handleSubmit} className="space-y-6 px-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Titulo:
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                {loading ? (
                  <span>Cargando ...</span>
                ) : (
                  <Button text={"Agregar observación"} />
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewComentarioModal;
