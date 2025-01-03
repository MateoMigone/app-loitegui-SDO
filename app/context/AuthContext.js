"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./../../firebaseConfig.mjs";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import Toastify from "toastify-js";
import { useRouter } from "next/navigation";
import { createUsuarioDoc, fetchUser } from "../lib/usuarios";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listener for changes in the state of the auth
    const removeListener = onAuthStateChanged(auth, async (user) => {
      const userInfo = user ? await fetchUser() : null;
      setCurrentUser(userInfo);
      console.log("userInfoContext: ", userInfo);

      user && user.emailVerified
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);

      setLoading(false);
    });

    return removeListener; // Removing the listener onAuthStateChange on component unmount
  }, []);

  // Login function
  const login = async (email, password) => {
    // Using firebase function to login with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Getting user info
    const user = userCredential.user;
    console.log("email: " + user.emailVerified);

    // Validating if user email is verified
    if (user.emailVerified) {
      console.log("logged in");
      router.replace("/");
    } else {
      auth.signOut();
      console.log("Email is not verified!");
      throw new Error("Verifique su email para activar su cuenta.");
    }
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    console.log("logged out");
  };

  // Create user function
  const createUser = async (name, email, password) => {
    // Using firebase function to create user with email and password
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("new account created");

    const body = { uid: auth.currentUser.uid, email, name };

    // Function that calls api for creating user doc
    createUsuarioDoc(body);

    // Using firebase function to send email verification
    sendEmailVerification(auth.currentUser);

    router.replace("/auth/verificar-email");

    // Show toast for successfull user creation
    Toastify({
      text: "Su cuenta se creo exitosamente. Debe verificar su email para poder acceder a la aplicación.",
      duration: 6000,
      gravity: "top",
      position: "center",
      style: {
        background: "#35a32f",
      },
    }).showToast();
  };

  // Resend verification email function
  const resendVerificationEmail = async () => {
    // checks for current user
    if (currentUser) {
      // Using firebase function to resend email verification
      await sendEmailVerification(currentUser);
      console.log("Verification email resent to: " + currentUser.email);

      // Show toast for successfull verification link resent
      Toastify({
        text: "Se reenvió el link para verificar tu cuenta.",
        duration: 5000,
        gravity: "bottom",
        position: "center",
        style: {
          background: "#35a32f",
        },
      }).showToast();
    }
  };

  // Reset password link function
  const resetPasswordLink = async (email) => {
    // Using firebase function to send password reset link by email
    await sendPasswordResetEmail(auth, email);
    console.log("Reset password link sent!");

    // Show toast for successfull password reset link sent
    Toastify({
      text: "Si tu email esta registrado recibirás un link para restablecer tu contraseña.",
      duration: 7000,
      gravity: "bottom",
      position: "center",
      style: {
        background: "#35a32f",
      },
    }).showToast();
  };

  const value = {
    currentUser,
    login,
    logout,
    createUser,
    resendVerificationEmail,
    resetPasswordLink,
    loading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
