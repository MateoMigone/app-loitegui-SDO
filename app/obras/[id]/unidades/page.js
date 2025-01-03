"use client";
import { useEffect, useState } from "react";
import withAuth from "../../../components/hoc/withAuth";
import Spinner from "../../../components/ui/Spinner";
import { getObraById } from "../../../lib/obras";
import RecursiveStructure from "../../../components/ui/RecursiveStructure";
import { useObraContext } from "../../../context/ObraContext";
import { useRouter } from "next/navigation";

function Unidades() {
  const { currentObraId, setCurrentObraId, setCurrentPath } = useObraContext();
  const [currentObra, setCurrentObra] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async (id) => {
      const obra = await getObraById(id);
      setCurrentObra(obra);
      setLoading(false);
      setCurrentPath(obra.name + " > Unidades");
    };

    if (currentObraId) {
      loadData(currentObraId);
    } else {
      const pathname = window.location.pathname; // Gets the full URL path
      const parts = pathname.split("/"); // Splits the path into an array of parts
      const id = parts[parts.length - 2]; // Sets the last part
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
      <div className="flex justify-between items-center w-full">
        <i
          className="bi bi-arrow-left-short text-[50px] mr-auto ml-1"
          onClick={handleReturn}
        ></i>
        <h4 className="text-center text-[15px] text-main-gray px-7">
          {currentObra.name + " > Unidades"}
        </h4>
      </div>
      <div className="px-10 py-5">
        {<RecursiveStructure level={currentObra.structure} index={0} />}
      </div>
    </div>
  );
}

export default withAuth(Unidades);
