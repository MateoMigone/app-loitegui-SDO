import { useEffect, useState } from "react";
import Button from "./Button";
import { deleteComentario, updateComentario } from "../../lib/comentarios";

const EditComentarioModal = ({
  closeModal,
  comentario,
  setComentarios,
  currentUser,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [titleHasChanged, setTitleHasChanged] = useState(false);
  const [statusHasChanged, setStatusHasChanged] = useState(false);

  useEffect(() => {
    setNewTitle(comentario.description);
    setNewStatus(comentario.finished);
  }, [comentario]);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
    setTitleHasChanged(comentario.description !== e.target.value);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.checked);
    setStatusHasChanged(comentario.finished !== e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleHasChanged || statusHasChanged) {
      const changes = {};
      if (titleHasChanged) changes["description"] = newTitle;
      if (statusHasChanged) changes["finished"] = newStatus;

      await updateComentario(comentario.id, changes);

      setComentarios((prevComentarios) =>
        prevComentarios.map((c) =>
          c.id === comentario.id ? { ...c, ...changes } : c
        )
      );
    }
    closeModal();
  };

  const deleteComment = async (e) => {
    e.preventDefault();
    await deleteComentario(comentario.id);
    setComentarios((prevComentarios) =>
      prevComentarios.filter((c) => c.id !== comentario.id)
    );
    closeModal();
  };

  return (
    <>
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
              Editar observación
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
            {currentUser.commenting && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Titulo:
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTitle}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={handleTitleChange}
                  required
                />
              </div>
            )}

            {currentUser.finishing && (
              <label className="inline-flex items-center mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={newStatus}
                  onChange={handleStatusChange}
                />
                <div className="relative w-[60px] h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-7 after:h-7 after:transition-all dark:border-gray-600 peer-checked:bg-main-green"></div>
                <span className="ms-3 text-sm font-medium text-gray-700 ">
                  Finalizada
                </span>
              </label>
            )}

            <div className="flex flex-col justify-end mt-4">
              {titleHasChanged || statusHasChanged ? (
                <Button text={"Guardar cambios"} />
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 text-gray-700 bg-gray-300 w-full font-medium rounded-lg text-md px-5 py-2.5 mb-3 mt-5"
                >
                  Guardar cambios
                </button>
              )}
            </div>
            <Button
              text={"Eliminar observación"}
              color={"bg-main-red"}
              onClick={deleteComment}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditComentarioModal;
