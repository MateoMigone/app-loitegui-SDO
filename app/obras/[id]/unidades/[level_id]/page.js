"use client";
import { useEffect, useState } from "react";
import withAuth from "../../../../components/hoc/withAuth";
import Spinner from "../../../../components/ui/Spinner";
import { fetchGremiosByUnidad } from "../../../../lib/gremios";
import { fetchTareasWithEstados } from "../../../../lib/tareas";
import TareaCard from "../../../../components/ui/TareaCard";
import ComentariosView from "../../../../components/ui/ComentariosView";
import { useObraContext } from "../../../../context/ObraContext";
import { useRouter } from "next/navigation";
import { fetchComentarios } from "../../../../lib/comentarios";

function Unidad() {
  const [loading, setLoading] = useState(true);
  const [levelId, setLevelId] = useState("");
  const [gremios, setGremios] = useState([]);
  const [currentGremio, setCurrentGremio] = useState(
    JSON.parse(localStorage.getItem("currentGremio")) || ""
  );
  const [tareas, setTareas] = useState([]);
  const [currentTarea, setCurrentTarea] = useState(
    JSON.parse(localStorage.getItem("currentTarea")) || ""
  );
  const [comentarios, setComentarios] = useState([]);
  const { currentPath } = useObraContext();
  const router = useRouter();

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split("/"); // Splits the path into an array of parts
    const id = parts[parts.length - 1];
    if (currentPath.split(" > ").length - id.split(".").length != 2)
      router.back();

    const loadData = async () => {
      const dataGremios = await fetchGremiosByUnidad(id);
      setGremios(dataGremios);
      setLevelId(id);

      if (currentGremio) {
        console.log(currentGremio.gremioId);
        console.log(id);

        const dataTareas = await fetchTareasWithEstados(
          currentGremio.gremioId,
          id
        );
        setTareas(dataTareas);
        console.log(dataTareas);
      }

      if (currentTarea) {
        const dataComentarios = await fetchComentarios(currentTarea.tareaId);
        setComentarios(dataComentarios);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const handleSelectGremio = async (gremioId, gremioName) => {
    setLoading(true);
    localStorage.setItem(
      "currentGremio",
      JSON.stringify({ gremioId, gremioName })
    );
    setCurrentGremio({ gremioId, gremioName });
    localStorage.setItem("currentTarea", JSON.stringify(""));
    setCurrentTarea("");
    setComentarios([]);

    const dataTareas = await fetchTareasWithEstados(gremioId, levelId);

    setTareas(dataTareas);
    setLoading(false);
  };

  const handleReturn = () => {
    if (currentTarea) {
      localStorage.setItem("currentTarea", JSON.stringify(""));
      setCurrentTarea("");
    } else if (currentGremio) {
      localStorage.setItem("currentGremio", JSON.stringify(""));
      setCurrentGremio("");
    } else router.back();
  };

  if (loading) return <Spinner />;
  else if (!gremios)
    return <div>No se encontraron gremios para esta unidad</div>;

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex justify-between items-center w-full">
        <i
          className="bi bi-arrow-left-short text-[50px] ml-1"
          onClick={handleReturn}
        ></i>
        <h6 className="text-center text-[15px] text-main-gray pl-7 pr-5">
          {currentPath}
        </h6>
      </div>
      <div className="flex flex-col pb-5 px-7">
        <h4 className="text-center text-[24px] text-main-gray">
          {!currentGremio ? "Gremios" : currentGremio.gremioName}
        </h4>
        <h5 className="text-center text-[16px] text-main-gray font-light">
          {currentTarea.tareaName}
        </h5>
      </div>
      {!currentGremio && (
        <div className="grid gap-5 w-[80%]">
          {gremios.map((gremio) => (
            <p
              className={`flex justify-between items-center bg-white px-5 py-3 text-main-gray rounded-md shadow-sm border-[1px]}`}
              key={gremio.id}
              onClick={() => handleSelectGremio(gremio.id, gremio.name)}
            >
              <span>{gremio.name}</span>
              <i className="bi bi-journal-text text-[25px]"></i>
            </p>
          ))}
        </div>
      )}
      {tareas && currentGremio && !currentTarea && (
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
      {currentGremio && currentTarea && (
        <ComentariosView
          comentarios={comentarios}
          tarea={currentTarea}
          setComentarios={setComentarios}
          setCurrentTarea={setCurrentTarea}
          setTareas={setTareas}
        />
      )}
    </div>
  );
}

export default withAuth(Unidad);
