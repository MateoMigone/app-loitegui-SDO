"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ObraContext = createContext();

export function ObraContextProvider({ children }) {
  const [currentObraId, setCurrentObraId] = useState(
    JSON.parse(localStorage.getItem("obraId")) || ""
  );
  const [currentPath, setCurrentPath] = useState(
    JSON.parse(localStorage.getItem("path")) || ""
  );
  /*   const router = useRouter(); */

  useEffect(() => {
    localStorage.setItem("obraId", JSON.stringify(currentObraId));
  }, [currentObraId]);

  useEffect(() => {
    localStorage.setItem("path", JSON.stringify(currentPath));
  }, [currentPath]);

  const value = {
    currentObraId,
    setCurrentObraId,
    currentPath,
    setCurrentPath,
  };

  return <ObraContext.Provider value={value}>{children}</ObraContext.Provider>;
}

export const useObraContext = () => useContext(ObraContext);
