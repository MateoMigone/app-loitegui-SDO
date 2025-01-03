"use client";
import withAuth from "../components/hoc/withAuth";
import Link from "next/link";
import { useObraContext } from "../context/ObraContext";
import { useEffect, useState } from "react";
import { fetchObras } from "../lib/obras";
import Spinner from "../components/ui/Spinner";

function Obras() {
  const { setCurrentObraId, setCurrentPath } = useObraContext();
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const obrasData = await fetchObras();
      setCurrentObraId("");
      setCurrentPath("");
      setObras(obrasData);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleClick = (obraId, obraName) => {
    setCurrentObraId(obraId);
    setCurrentPath(obraName);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h3 className="text-center text-[26px] text-main-gray p-7">Obras</h3>
      <div>
        {obras.map((obra) => {
          return (
            <Link
              href={`/obras/${obra.id}`}
              key={obra.id}
              onClick={() => handleClick(obra.id, obra.name)}
            >
              <p className="text-center bg-main-gray text-white p-5 mx-[20%] my-7">
                {obra.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default withAuth(Obras);
