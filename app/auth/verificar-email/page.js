"use client";
import Link from "next/link";
import Button from "../../components/ui/Button";
import { useAuthContext } from "../../context/AuthContext";
import withoutAuth from "../../components/hoc/withoutAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Toastify from "toastify-js";
import Spinner from "../../components/ui/Spinner";

function VerifyEmail() {
  const { logout, resendVerificationEmail, currentUser } = useAuthContext();
  const router = useRouter();

  const handleClick = async () => {
    try {
      await resendVerificationEmail();
    } catch (error) {
      Toastify({
        text: "No se pudo reenviar el link. Aguarde un minuto y vuelva a intentar.",
        duration: 6000,
        gravity: "bottom",
        position: "center",
        style: {
          background: "#a32f2f",
        },
      }).showToast();
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.replace("/auth/login");
    }
  });

  if (!currentUser) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-rows-[200px_1fr_1fr] items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-4xl font-bold text-main-gray">Verificar email</h2>
      <div className="w-[70%] block mb-2 text-md font-medium text-main-gray text-center bg-white p-5 border-[3px] border-black rounded-lg min-w-[280px] max-w-[350px]">
        <i className="bi bi-envelope text-[50px]"></i>
        <p className="text-center">
          Te hemos enviado un correo para verificar tu cuenta. Revisa tu bandeja
          de entrada y haz clic en el enlace para activarla. Si no ves el
          correo, revisa en spam o correo no deseado.
        </p>
      </div>
      <div className="flex flex-col gap-1 h-full w-[70%] items-center mt-10">
        <a
          onClick={handleClick}
          className="font-semibold text-center min-w-[231px]"
        >
          No te llegó el correo?
          <br /> Haz click aquí para reenviarlo
        </a>
        <Link onClick={logout} href={"/auth/login"} className="w-full">
          <Button text={"Ir al login"} />
        </Link>
      </div>
    </div>
  );
}

export default withoutAuth(VerifyEmail);
