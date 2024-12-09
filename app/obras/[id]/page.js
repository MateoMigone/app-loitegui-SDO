"use client";
import { useEffect, useState } from "react";
import withAuth from "../../components/hoc/withAuth";
import Spinner from "../../components/ui/Spinner";
import { getObraById } from "../../lib/obras";
import Link from "next/link";
import Button from "../../components/ui/Button";

function Obra() {
  const [loading, setLoading] = useState(true);
  const [currentObra, setCurrentObra] = useState({});

  useEffect(() => {
    const pathname = window.location.pathname; // Gets the full URL path
    const parts = pathname.split("/"); // Splits the path into an array of parts
    const id = parts[parts.length - 1]; // Sets the last part

    const loadData = async (id) => {
      const obra = await getObraById(id);
      setCurrentObra(obra);
      setLoading(false);
    };

    loadData(id);
  }, []);

  if (loading) return <Spinner />;
  else if (!currentObra)
    return <div>La obra a la que estas intentando acceder no existe</div>;

  return (
    <div>
      <h3 className="text-center text-[26px] text-main-gray p-7">
        {currentObra.name}
      </h3>
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
