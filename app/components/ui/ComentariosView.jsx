import Button from "./Button";

const ComentariosView = ({ comentarios }) => {
  return (
    <div className="w-[80%]">
      {comentarios.map((comentario) => {
        return (
          <p
            className="flex gap-4 items-center bg-white px-5 py-3 text-main-gray rounded-md shadow-sm border-[1px]"
            key={comentario.id}
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
      <Button text={"Agregar comentario"}>
        <i class="bi bi-plus text-[30px]"></i>
      </Button>
    </div>
  );
};

export default ComentariosView;
