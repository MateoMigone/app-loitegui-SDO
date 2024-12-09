import { fetchComentarios } from "../../lib/comentarios";

const TareaCard = ({ tarea, setCurrentTarea, setLoading, setComentarios }) => {
  const handleClick = async () => {
    setLoading(true);
    setCurrentTarea(tarea.title);
    const dataComentarios = await fetchComentarios(tarea.id);
    console.log("aa: " + dataComentarios);

    setComentarios(dataComentarios);
    setLoading(false);
  };

  return (
    <>
      <p
        className="flex gap-4 items-center bg-white px-5 py-3 text-main-gray rounded-md shadow-sm border-[1px]"
        key={tarea.id}
        onClick={handleClick}
      >
        {tarea.finished ? (
          <i className="bi bi-check-circle-fill text-main-green text-[20px]"></i>
        ) : (
          <i className="bi bi-circle text-main-green text-[20px]"></i>
        )}
        <span className="text-sm max-w-[70%]">{tarea.title}</span>
        <i className="bi bi-eye text-[20px] ml-auto"></i>
      </p>
    </>
  );
};

export default TareaCard;
