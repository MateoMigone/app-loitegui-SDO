"use client";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuthContext();

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={openDrawer} className="p-4 text-white bg-blue-500">
        Menu
      </button>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button onClick={closeDrawer} className="p-4 text-white">
          Close
        </button>
        <ul className="text-white">
          <li>
            <a href="#" className="block p-4">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block p-4">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block p-4">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="block p-4">
              Contact
            </a>
          </li>
          <li>
            <button onClick={logout}>Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DrawerMenu;
