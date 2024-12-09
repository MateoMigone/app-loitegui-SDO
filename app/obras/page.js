"use client";
import Link from "next/link";
import withAuth from "../components/hoc/withAuth";
import Spinner from "../components/ui/Spinner";
import { fetchObras } from "../lib/obras";
import { useEffect, useState } from "react";

function Obras() {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const obrasData = await fetchObras();
      setObras(obrasData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h3 className="text-center text-[26px] text-main-gray p-7">Obras</h3>
      <div>
        {obras.map((obra) => {
          return (
            <Link href={`/obras/${obra.id}`} key={obra.id}>
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
