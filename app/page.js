"use client";
import { useRouter } from "next/navigation";
import withAuth from "./components/hoc/withAuth";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import Spinner from "./components/ui/Spinner";

function Home() {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/obras");
    }
  }, [isAuthenticated, loading, router]);

  return <Spinner />;
}

export default withAuth(Home);
