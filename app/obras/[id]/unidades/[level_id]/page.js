"use client";
import { useEffect, useState } from "react";
import withAuth from "../../../../components/hoc/withAuth";
import Spinner from "../../../../components/ui/Spinner";
import { fetchGremios } from "../../../../lib/gremios";
import { fetchTareasWithEstados } from "../../../../lib/tareas";
import TareaCard from "../../../../components/ui/TareaCard";
import ComentariosView from "../../../../components/ui/ComentariosView";

function Unidad() {
  const [loading, setLoading] = useState(true);
  const [levelId, setLevelId] = useState("");
  const [gremios, setGremios] = useState([]);
  const [currentGremio, setCurrentGremio] = useState("");
  const [tareas, setTareas] = useState([]);
  const [currentTarea, setCurrentTarea] = useState("");
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const dataGremios = await fetchGremios();
      const pathname = window.location.pathname;
      const parts = pathname.split("/"); // Splits the path into an array of parts
      const id = parts[parts.length - 1];

      setGremios(dataGremios);
      setLevelId(id);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleClick = async (gremioId, gremioName) => {
    setLoading(true);
    setCurrentGremio(gremioName);
    setCurrentTarea("");
    setComentarios([]);

    const dataTareas = await fetchTareasWithEstados(gremioId, levelId);
    console.log(dataTareas);

    setTareas(dataTareas);
    setLoading(false);
  };

  if (loading) return <Spinner />;
  else if (!gremios)
    return <div>No se encontraron gremios para esta unidad</div>;

  return (
    <div className="flex flex-col gap-3 items-center">
      <h4 className="text-center text-[26px] text-main-gray p-7">
        {currentGremio ? `${levelId} - ${currentGremio}` : levelId}
      </h4>
      {!currentGremio && (
        <div className="grid gap-5 w-[80%]">
          {gremios.map((gremio) => (
            <p
              className="flex justify-between items-center bg-white px-5 py-3 text-main-gray rounded-md shadow-sm border-[1px]"
              key={gremio.id}
              onClick={() => handleClick(gremio.id, gremio.name)}
            >
              <span>{gremio.name}</span>
              <i className="bi bi-journal-text text-[25px]"></i>
            </p>
          ))}
        </div>
      )}
      {tareas && !currentTarea && (
        <div className="grid gap-5 w-[80%]">
          {tareas.map((tarea) => (
            <TareaCard
              key={tarea.id}
              tarea={tarea}
              setCurrentTarea={setCurrentTarea}
              setLoading={setLoading}
              setComentarios={setComentarios}
            />
          ))}
        </div>
      )}
      {currentTarea && <ComentariosView comentarios={comentarios} />}
    </div>
  );
}

export default withAuth(Unidad);
