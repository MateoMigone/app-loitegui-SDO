"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext"; // Adjust the path as necessary
import Spinner from "../ui/Spinner";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const router = useRouter();
    const { loading, isAuthenticated, currentUser } = useAuthContext(); // Assume your auth context provides these

    useEffect(() => {
      if (!loading) {
        // Ensure authentication status is not pending
        !isAuthenticated && router.replace("/auth/login");
      }
    }, [isAuthenticated, loading, router]);

    // Render a loading screen or nothing until the check is complete
    if (loading || !isAuthenticated) {
      return <Spinner />;
    }

    if (!currentUser.reading)
      return (
        <div className="w-[80%] mx-auto my-12 flex flex-col items-center p-4 bg-white border-[1px] border-[#CDCCCA] shadow rounded">
          <i className="bi bi-info-circle-fill text-[80px] text-[#3498db]"></i>
          <p className="text-[18px] text-medium text-center">
            Para acceder a la aplicación debes solicitar los permisos
            correspondientes al administrador.
          </p>
        </div>
      );

    // Return the wrapped component with all props passed down
    return <WrappedComponent {...props} />;
  };

  // Assign a meaningful displayName for easier debugging
  ComponentWithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
