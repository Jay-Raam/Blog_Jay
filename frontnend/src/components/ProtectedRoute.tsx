"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/dashboard/context/ContentProvider";
import { useEffect, useState } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        await router.push("/dashboard/login");
      }
      setLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
