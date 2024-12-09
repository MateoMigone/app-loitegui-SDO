"use client";
import { useEffect, useState } from "react";
import withAuth from "../../../components/hoc/withAuth";
import Spinner from "../../../components/ui/Spinner";
import { getObraById } from "../../../lib/obras";
import RecursiveStructure from "../../../components/ui/RecursiveStructure";

function Unidades() {
  const [loading, setLoading] = useState(true);
  const [currentObra, setCurrentObra] = useState({});

  useEffect(() => {
    const pathname = window.location.pathname; // Gets the full URL path
    const parts = pathname.split("/"); // Splits the path into an array of parts
    const id = parts[parts.length - 2]; // Sets the last part

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
      <h4 className="text-center text-[26px] text-main-gray p-7">
        {currentObra.name}
      </h4>
      <div className="px-10 py-5">
        {<RecursiveStructure level={currentObra.structure} />}
      </div>
    </div>
  );
}

export default withAuth(Unidades);
