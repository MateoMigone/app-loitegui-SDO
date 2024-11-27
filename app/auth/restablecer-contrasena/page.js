"use client";
import { useState } from "react";
import Button from "../../components/ui/Button";
import Link from "next/link";
import { useAuthContext } from "../../context/AuthContext";
import withoutAuth from "../../components/hoc/withoutAuth";

function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { resetPasswordLink } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    console.log("Submitting:", { email });

    try {
      await resetPasswordLink(email);
    } catch (error) {
      setErrorMessage("Email inválido.");
    }
    setEmail("");
  };
  return (
    <div className="grid grid-rows-[200px_1fr] items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex w-full flex-col items-center">
        <Link href={"/auth/login"} className="mr-auto ml-3">
          <i className="bi bi-arrow-left-short text-[50px]"></i>
        </Link>
        <h2 className="text-4xl font-bold text-main-gray text-center max-w-[250px]">
          Restablecer contraseña
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[70%] items-center min-w-[280px] max-w-[350px] h-full mt-20"
      >
        <div className=" block text-md font-medium text-main-gray text-center bg-white p-5 border-[3px] border-black rounded-lg mb-5">
          <p className="text-left mb-6">
            Ingresa el correo electrónico asociado a tu cuenta para recibir un
            enlace de recuperación de contraseña.
          </p>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white gray-50 border border-black border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Escriba su email"
            required
          />
        </div>
        {errorMessage && (
          <p className="text-[#a32f2f] font-semibold">{errorMessage}</p>
        )}

        <Button text={"Enviar enlace"} />
      </form>
    </div>
  );
}

export default withoutAuth(RecoverPassword);
