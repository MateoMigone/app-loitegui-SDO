"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext"; // Adjust the path as necessary
import Spinner from "../ui/Spinner";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { loading, isAuthenticated } = useAuthContext(); // Assume your auth context provides these

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

    // Return the wrapped component with all props passed down
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;