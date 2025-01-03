import { useEffect, useState } from "react";
import Button from "./Button";
import { deleteUser, updateUser } from "../../lib/usuarios";

const EditUserModal = ({ closeModal, user, setUserList }) => {
  const [newReadingStatus, setNewReadingStatus] = useState("");
  const [newCommentingStatus, setNewCommentingStatus] = useState("");
  const [newFinishingStatus, setNewFinishingStatus] = useState("");
  const [newAdminStatus, setNewAdminStatus] = useState("");
  const [readingStatusHasChanged, setReadingStatusHasChanged] = useState(false);
  const [commentingStatusHasChanged, setCommentingStatusHasChanged] =
    useState(false);
  const [finishingStatusHasChanged, setFinishingStatusHasChanged] =
    useState(false);
  const [adminStatusHasChanged, setAdminStatusHasChanged] = useState(false);

  useEffect(() => {
    setNewReadingStatus(user.reading);
    setNewCommentingStatus(user.commenting);
    setNewFinishingStatus(user.finishing);
    setNewAdminStatus(user.admin);
  }, [user]);

  const handleReadingStatusChange = (e) => {
    setNewReadingStatus(e.target.checked);
    setReadingStatusHasChanged(user.reading !== e.target.checked);
  };

  const handleCommentingStatusChange = (e) => {
    setNewCommentingStatus(e.target.checked);
    setCommentingStatusHasChanged(user.commenting !== e.target.checked);
  };

  const handleFinishingStatusChange = (e) => {
    setNewFinishingStatus(e.target.checked);
    setFinishingStatusHasChanged(user.finishing !== e.target.checked);
  };

  const handleAdminStatusChange = (e) => {
    setNewAdminStatus(e.target.checked);
    setAdminStatusHasChanged(user.admin !== e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      readingStatusHasChanged ||
      commentingStatusHasChanged ||
      finishingStatusHasChanged ||
      adminStatusHasChanged
    ) {
      const changes = {};
      if (readingStatusHasChanged) changes["reading"] = newReadingStatus;
      if (commentingStatusHasChanged)
        changes["commenting"] = newCommentingStatus;
      if (finishingStatusHasChanged) changes["finishing"] = newFinishingStatus;
      if (adminStatusHasChanged) changes["admin"] = newAdminStatus;

      await updateUser(user.uid, changes);
      setUserList((prevUsers) =>
        prevUsers.map((u) => (u.uid === user.uid ? { ...u, ...changes } : u))
      );
    }
    closeModal();
  };

  const deleteUsuario = async (e) => {
    e.preventDefault();
    await deleteUser(user.uid);
    setUserList((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
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
          <div className="flex justify-between gap-2 items-center mb-3 px-6">
            <div className="flex flex-col items-center w-full">
              <h2 className="text-xl font-semibold text-gray-700">
                {user.name}
              </h2>
              <p>{user.email}</p>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 text-[30px]"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <hr className="mb-8" />
          <form onSubmit={handleSubmit} className="space-y-6 px-6">
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={newReadingStatus}
                onChange={handleReadingStatusChange}
              />
              <div class="relative w-[60px] h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-7 after:h-7 after:transition-all dark:border-gray-600 peer-checked:bg-main-green"></div>
              <span class="ms-3 text-sm font-medium text-gray-700 ">
                Lectura
              </span>
            </label>

            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={newCommentingStatus}
                onChange={handleCommentingStatusChange}
              />
              <div className="relative w-[60px] h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-7 after:h-7 after:transition-all dark:border-gray-600 peer-checked:bg-main-green"></div>
              <span className="ms-3 text-sm font-medium text-gray-700 ">
                Agregar observaciones
              </span>
            </label>

            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={newFinishingStatus}
                onChange={handleFinishingStatusChange}
              />
              <div className="relative w-[60px] h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-7 after:h-7 after:transition-all dark:border-gray-600 peer-checked:bg-main-green"></div>
              <span className="ms-3 text-sm font-medium text-gray-700 ">
                Finalizar tareas/observaciones
              </span>
            </label>

            <label className="inline-flex items-center mb-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={newAdminStatus}
                onChange={handleAdminStatusChange}
              />
              <div className="relative w-[60px] h-8 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-7 after:h-7 after:transition-all dark:border-gray-600 peer-checked:bg-main-green"></div>
              <span className="ms-3 text-sm font-medium text-gray-700">
                Admin
              </span>
            </label>

            <div className="flex flex-col justify-end mt-4">
              {readingStatusHasChanged ||
              commentingStatusHasChanged ||
              finishingStatusHasChanged ||
              adminStatusHasChanged ? (
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
              text={"Eliminar usuario"}
              color={"bg-main-red"}
              onClick={deleteUsuario}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;
