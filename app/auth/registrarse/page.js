"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import EmailInput from "../../components/ui/EmailInput";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";
import PasswordRepeatInput from "../../components/ui/PasswordRepeatInput";
import NameInput from "../../components/ui/NameInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import withoutAuth from "../../components/hoc/withoutAuth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errors, setErrors] = useState({});
  const { currentUser, createUser } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/auth/verificar-email");
    }
  });

  const checkErrors = () => {
    const errorsFound = {};
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) errorsFound.name = "El nombre es obligatorio.";
    else if (name.length < 3) {
      errorsFound.name = "El nombre debe tener al menos 3 caracteres.";
    } else if (!nameRegex.test(name)) {
      errorsFound.name = "El nombre no puede incluir números ni símbolos.";
    }

    if (!email) errorsFound.email = "El email es obligatorio";
    else if (!emailRegex.test(email)) {
      errorsFound.email = "El formato del email es inválido.";
    }

    if (!password) errorsFound.password = "La contraseña es obligatoria.";
    else if (password.length < 6) {
      errorsFound.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!passwordRepeat)
      errorsFound.passwordRepeat =
        "El campo repetir contraseña es obligatorio.";
    else if (passwordRepeat !== password) {
      errorsFound.passwordRepeat = "Las contraseñas no coinciden.";
    }

    return errorsFound;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    console.log("Submitting:", { email, password });

    const validationErrors = checkErrors();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await createUser(email, password);
        setErrors({});
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setErrors({ email: "Este email ya está registrado." });
        }
      }
    }
  };
  return (
    <div className="grid grid-rows-[150px_1fr] items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex w-full flex-col items-center">
        <Link href={"/login"} className="mr-auto ml-3">
          <i className="bi bi-arrow-left-short text-[50px]"></i>
        </Link>
        <h2 className="text-4xl font-bold text-main-gray">Registrarse</h2>
      </div>
      <form onSubmit={handleSubmit} className="w-[70%]">
        <NameInput name={name} setName={setName} />
        {errors.name && (
          <p className="text-[#a32f2f] font-semibold mb-5">{errors.name}</p>
        )}
        <EmailInput email={email} setEmail={setEmail} />
        {errors.email && (
          <p className="text-[#a32f2f] font-semibold mb-5">{errors.email}</p>
        )}
        <PasswordInput password={password} setPassword={setPassword} />
        {errors.password && (
          <p className="text-[#a32f2f] font-semibold mb-5">{errors.password}</p>
        )}
        <PasswordRepeatInput
          passwordRepeat={passwordRepeat}
          setPasswordRepeat={setPasswordRepeat}
        />
        {errors.passwordRepeat && (
          <p className="text-[#a32f2f] font-semibold mb-5">
            {errors.passwordRepeat}
          </p>
        )}
        <Button text={"Crear cuenta"} />
      </form>
    </div>
  );
}

export default withoutAuth(Register);
