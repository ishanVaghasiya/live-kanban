import { useAppSelector } from "@redux/hooks/hook";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (router.pathname === "/login") {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated && router.pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
