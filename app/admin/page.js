"use client";
import { useRouter } from "next/navigation";
import withAuth from "../components/hoc/withAuth";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

function Admin() {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  const handleCLick = (e) => {
    e.preventDefault();
    router.push("/admin/usuarios");
  };

  useEffect(() => {
    if (!currentUser.admin) {
      setTimeout(() => {
        router.replace("/obras");
      }, 3000);
    }
  }, []);

  if (!currentUser.admin)
    return (
      <div className="w-[80%] mx-auto my-12 flex flex-col items-center">
        <i className="bi bi-exclamation-triangle-fill text-[80px] text-[orange]"></i>
        <p className="text-[20px] text-medium text-center">
          Acceso restringido.
        </p>
        <p className="text-[20px] text-medium text-center">
          {" "}
          Serás redirigido a la página principal.
        </p>
      </div>
    );
  return (
    <section>
      <h2 className="text-center text-[26px] text-main-gray p-7">
        Panel de admin
      </h2>
      <button
        className="w-[80%] p-6 bg-[#8A9A5B] text-white mx-auto flex flex-col items-center rounded-lg shadow-lg"
        onClick={handleCLick}
      >
        <i className="bi bi-person-fill text-[80px]"></i>
        <p className="text-[24px] font-medium tracking-widest">Usuarios</p>
      </button>
    </section>
  );
}

export default withAuth(Admin);
