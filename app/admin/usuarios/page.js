"use client";
import { useRouter } from "next/navigation";
import withAuth from "../../components/hoc/withAuth";
import EditUserModal from "../../components/ui/EditUserModal";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../lib/usuarios";
import Spinner from "../../components/ui/Spinner";
import { useAuthContext } from "../../context/AuthContext";

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!currentUser.admin) {
      setTimeout(() => {
        router.replace("/obras");
      }, 3000);
    }
    const loadData = async () => {
      setUsers(await fetchAllUsers());
    };

    if (currentUser.admin) loadData();
    setLoading(false);
  }, []);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };
  const closeEditModal = () => setIsEditOpen(false);

  const handleReturn = () => router.back();

  if (loading) return <Spinner />;
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
      <i
        className="bi bi-arrow-left-short text-[50px] mr-auto ml-1"
        onClick={handleReturn}
      ></i>
      <h2 className="text-center text-[26px] text-main-gray p-7 pt-0">
        Usuarios
      </h2>
      <div className="w-[80%] mx-auto flex flex-col gap-3">
        {users.map((user) => {
          return (
            <button
              key={user.uid}
              className="w-full py-3 px-6 bg-white mx-auto flex justify-between items-center gap-3 rounded-lg shadow border-[1px] border-[#CDCCCA]"
              onClick={() => openEditModal(user)}
            >
              <p className="text-[18px] font-medium truncate">{user.name}</p>
              <i className="bi bi-pencil-square text-[20px]"></i>
            </button>
          );
        })}
      </div>
      {isEditOpen && (
        <EditUserModal
          closeModal={closeEditModal}
          user={selectedUser}
          setUserList={setUsers}
        />
      )}
    </section>
  );
}

export default withAuth(Usuarios);
