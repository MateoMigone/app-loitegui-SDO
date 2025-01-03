"use client";
import { useEffect, useState } from "react";
import withAuth from "../../components/hoc/withAuth";
import Spinner from "../../components/ui/Spinner";
import { getObraById } from "../../lib/obras";
import Link from "next/link";
import Button from "../../components/ui/Button";
import { useObraContext } from "../../context/ObraContext";
import { useRouter } from "next/navigation";

function Obra() {
  const { currentObraId, setCurrentObraId, setCurrentPath } = useObraContext();
  const [currentObra, setCurrentObra] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async (id) => {
      const obra = await getObraById(id);
      setCurrentObra(obra);
      setCurrentPath(obra.name);
      setLoading(false);
    };

    if (currentObraId) {
      loadData(currentObraId);
    } else {
      const pathname = window.location.pathname; // Gets the full URL path
      const parts = pathname.split("/"); // Splits the path into an array of parts
      const id = parts[parts.length - 1]; // Sets the last part
      setCurrentObraId(id);
      loadData(id);
    }
  }, []);

  const handleReturn = () => {
    router.back();
  };

  if (loading) return <Spinner />;
  else if (!currentObra)
    return <div>La obra a la que estas intentando acceder no existe</div>;

  return (
    <div>
      <div className="flex flex-col justify-between items-center w-full">
        <i
          className="bi bi-arrow-left-short text-[50px] mr-auto ml-1"
          onClick={handleReturn}
        ></i>
        <h3 className="text-center text-[26px] text-main-gray px-7 pb-7">
          {currentObra.name}
        </h3>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <div className="bg-white w-[80%] p-5 text-[18px] text-center rounded border-1 border-[#CDCCCA] shadow-sm">
          Gestionar tareas
          <Link href={`${window.location.pathname}/unidades`}>
            <Button text={"Ver unidades"} color={"bg-main-gray"} />
          </Link>
        </div>
        <div className="bg-white w-[80%] p-5 text-[18px] text-center rounded border-1 border-[#CDCCCA] shadow-sm">
          Gremios
          <Link href={`${window.location.pathname}/reportes`}>
            <Button text={"Generar reportes"} color={"bg-main-gray"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Obra);
