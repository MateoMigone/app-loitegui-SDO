"use client";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import EmailInput from "../../components/ui/EmailInput";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";
import Link from "next/link";
import withoutAuth from "../../components/hoc/withoutAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    console.log("Submitting:", { email, password });

    try {
      await login(email, password);
      setErrorMessage("");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("Email o contraseña inválidos.");
      } else if (
        error.message === "Verifique su email para activar su cuenta."
      ) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error al inciar sesión.");
      }
    }
  };
  return (
    <div className="grid grid-rows-[200px_1fr_1fr] items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-4xl font-bold text-main-gray">Login</h2>
      <form onSubmit={handleSubmit} className="w-[70%]">
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        {errorMessage && (
          <p className="text-[#a32f2f] font-semibold">{errorMessage}</p>
        )}
        <Button text={"Iniciar sesión"} />
      </form>
      <div className="flex flex-col gap-1 h-[140px] w-[70%] justify-center border-t-2 border-[#CAC4D0] items-center">
        <Link href={"/auth/registrarse"} className="font-semibold">
          Crear una cuenta nueva
        </Link>
        <Link href={"/auth/restablecer-contrasena"} className="font-semibold">
          Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
}

export default withoutAuth(Login);
