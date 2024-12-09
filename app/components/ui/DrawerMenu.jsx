"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Button from "./Button";
import Link from "next/link";

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const { logout, currentUser } = useAuthContext();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    // This ensures that we are only trying to access window when it's available (in the browser)
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={openDrawer} className="text-white text-[35px]">
        <i className="bi bi-list"></i>
      </button>

      <div
        className={`grid grid-rows-[50px_1fr_100px] z-50 fixed top-0 left-0 w-64 h-full bg-main-brown transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center mt-5 mr-4">
          <h2 className="text-white text-[26px] text-center font-bold flex-1">
            APP LOITEGUI
          </h2>
          <button onClick={closeDrawer} className="text-white ml-auto">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <ul className="text-white mt-5">
          <li>
            <Link
              href="/admin"
              className={`block px-6 py-4 flex gap-4 items-center text-[22px] ${
                pathname.startsWith("/admin") && "bg-[#34312E]"
              }`}
            >
              <i className="bi bi-person-fill-gear"></i> <span>Admin</span>
            </Link>
          </li>
          <li>
            <Link
              href="/obras"
              className={`block px-6 py-4 flex gap-4 items-center text-[22px] ${
                pathname.startsWith("/obras") && "bg-[#34312E]"
              }`}
            >
              <i className="bi bi-buildings"></i> <span>Obras</span>
            </Link>
          </li>
        </ul>
        <div className="flex flex-col items-center">
          <p className="text-white flex gap-2">
            <i className="bi bi-person-fill"></i>
            <span>{currentUser?.email}</span>
          </p>
          <div className="w-[70%]">
            <Button
              text={"Cerrar sesión"}
              color={"bg-main-red"}
              onClick={logout}
            />
          </div>
        </div>
      </div>
      {open && (
        <div
          onClick={closeDrawer}
          className="bg-black bg-opacity-50 z-40 fixed left-0 top-0 min-h-screen min-w-full"
        ></div>
      )}
    </>
  );
};

export default DrawerMenu;
